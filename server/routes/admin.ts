import { Router, Request, Response } from 'express';
import { db } from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { updateRuntimeSmtpConfig, getSmtpStatus } from '../emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const adminRouter = Router();

// 1. HIGH-LEVEL STATS & HEALTH
adminRouter.get('/stats', (_req: Request, res: Response) => {
  try {
    const userCount = (db.prepare('SELECT count(*) as count FROM users').get() as any)?.count || 0;
    const scriptCount = (db.prepare('SELECT count(*) as count FROM scripts').get() as any)?.count || 0;
    const emailCount = (db.prepare('SELECT count(*) as count FROM emails').get() as any)?.count || 0;

    const dbPath = path.join(__dirname, '../../data/scriptforge.db');
    let dbSizeKb = 0;
    if (fs.existsSync(dbPath)) {
      const stat = fs.statSync(dbPath);
      dbSizeKb = Math.round(stat.size / 1024);
    }

    const tables = [
      { name: 'users', rows: userCount },
      { name: 'scripts', rows: scriptCount },
      { name: 'emails', rows: emailCount },
      { name: 'auth_sessions', rows: (db.prepare('SELECT count(*) as count FROM auth_sessions').get() as any)?.count || 0 },
    ];

    return res.json({
      status: 'healthy',
      database: 'SQLite (WAL Mode Active)',
      dbSizeKb,
      dbPath,
      stats: {
        users: userCount,
        scripts: scriptCount,
        emails: emailCount,
      },
      tables,
      smtp: getSmtpStatus(),
      uptimeSeconds: Math.round(process.uptime()),
    });
  } catch (err: any) {
    console.error('Admin stats error:', err);
    return res.status(500).json({ error: 'Failed to retrieve admin stats.' });
  }
});

// 2. RAW SQL QUERY RUNNER
adminRouter.post('/query', (req: Request, res: Response) => {
  try {
    const { sql } = req.body;
    if (!sql || typeof sql !== 'string') {
      return res.status(400).json({ error: 'SQL query string is required.' });
    }

    const trimmed = sql.trim();
    const isSelect = /^(SELECT|PRAGMA|EXPLAIN)/i.test(trimmed);

    const start = performance.now();
    let rows: any[] = [];
    let changes = 0;

    if (isSelect) {
      rows = db.prepare(trimmed).all();
    } else {
      const info = db.prepare(trimmed).run();
      changes = info.changes;
    }
    const elapsedMs = Math.round((performance.now() - start) * 100) / 100;

    return res.json({
      success: true,
      query: trimmed,
      isSelect,
      rowCount: isSelect ? rows.length : changes,
      elapsedMs,
      rows: isSelect ? rows : undefined,
      message: isSelect ? `Fetched ${rows.length} row(s)` : `Query executed. Rows affected: ${changes}`,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message || 'SQL execution failed.',
    });
  }
});

// 3. GET FULL TABLE DATA
adminRouter.get('/table/:tableName', (req: Request, res: Response) => {
  try {
    const tableName = req.params.tableName;
    const allowed = ['users', 'scripts', 'emails', 'auth_sessions'];
    if (!allowed.includes(tableName)) {
      return res.status(400).json({ error: 'Invalid table name.' });
    }

    const rows = db.prepare(`SELECT * FROM ${tableName} ORDER BY rowid DESC LIMIT 100`).all();
    return res.json({ table: tableName, count: rows.length, rows });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 4. DATABASE BACKUP FILE DOWNLOAD
adminRouter.get('/backup', (_req: Request, res: Response) => {
  try {
    const dbPath = path.join(__dirname, '../../data/scriptforge.db');
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ error: 'Database file not found.' });
    }

    // Force checkpoint to flush WAL to disk
    db.pragma('wal_checkpoint(TRUNCATE)');

    res.download(dbPath, `scriptforge-backup-${new Date().toISOString().slice(0, 10)}.db`);
  } catch (err: any) {
    console.error('Backup download error:', err);
    return res.status(500).json({ error: 'Failed to download database backup.' });
  }
});

// 5. DATABASE VACUUM & OPTIMIZE
adminRouter.post('/vacuum', (_req: Request, res: Response) => {
  try {
    const start = performance.now();
    db.exec('VACUUM;');
    db.pragma('wal_checkpoint(TRUNCATE);');
    const elapsedMs = Math.round((performance.now() - start) * 100) / 100;
    return res.json({ message: `Database vacuumed and optimized in ${elapsedMs}ms.` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// 6. TEST SMTP EMAIL SENDING & HANDSHAKE
adminRouter.post('/test-smtp', async (req: Request, res: Response) => {
  try {
    const { targetEmail, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = req.body;

    if (!targetEmail) {
      return res.status(400).json({ error: 'Target recipient email is required.' });
    }

    let transporter: nodemailer.Transporter;

    if (smtpHost && smtpUser && smtpPass) {
      // Use test credentials from request
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Boolean(smtpSecure),
        auth: { user: smtpUser, pass: smtpPass },
      });
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use env credentials
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    } else {
      // Create Ethereal test mailer
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    // Verify SMTP connection
    await transporter.verify();

    // Send diagnostic email
    const info = await transporter.sendMail({
      from: smtpUser || process.env.SMTP_USER || '"ScriptForge Studio" <notifications@scriptforge.studio>',
      to: targetEmail,
      subject: `ScriptForge Live SMTP Test — ${new Date().toLocaleTimeString()}`,
      html: `
        <div style="background:#050B16; color:#F2F5F8; padding:24px; font-family:sans-serif; border-radius:12px;">
          <h2 style="color:#4AA3DF;">ScriptForge SMTP Diagnostic Passed! ⚡</h2>
          <p>This email confirms that your ScriptForge SMTP server is connected and delivering emails.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Recipient:</strong> ${targetEmail}</p>
        </div>
      `,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;

    return res.json({
      success: true,
      message: `Email successfully dispatched to ${targetEmail}!`,
      messageId: info.messageId,
      previewUrl,
    });
  } catch (err: any) {
    console.error('SMTP test error:', err);
    return res.status(400).json({
      success: false,
      error: `SMTP Delivery Failed: ${err.message}`,
    });
  }
});

// 7. CONFIGURE SMTP AT RUNTIME
adminRouter.post('/configure-smtp', (req: Request, res: Response) => {
  try {
    const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, smtpFrom } = req.body;

    updateRuntimeSmtpConfig({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Boolean(smtpSecure),
      user: smtpUser,
      pass: smtpPass,
      from: smtpFrom || smtpUser,
    });

    // Update .env file
    const envPath = path.join(__dirname, '../../.env');
    const envContent = `
PORT=5000
NODE_ENV=production
JWT_SECRET=scriptforge_secret_key_super_secure_2026
DATABASE_PATH=./data/scriptforge.db
SMTP_HOST=${smtpHost || ''}
SMTP_PORT=${smtpPort || 587}
SMTP_SECURE=${smtpSecure ? 'true' : 'false'}
SMTP_USER=${smtpUser || ''}
SMTP_PASS=${smtpPass || ''}
SMTP_FROM="${smtpFrom || smtpUser || 'ScriptForge Studio <notifications@scriptforge.studio>'}"
`.trim();

    fs.writeFileSync(envPath, envContent, 'utf-8');

    return res.json({
      success: true,
      message: 'SMTP configuration updated and persisted to .env!',
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
