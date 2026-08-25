import express from 'express';
import cors from 'cors';
import { initializeDatabase, db } from './db.js';
import { authRouter } from './routes/auth.js';
import { scriptsRouter } from './routes/scripts.js';
import { emailsRouter } from './routes/emails.js';
import { adminRouter } from './routes/admin.js';
import { MOCK_SCRIPTS } from '../src/data/mockScripts.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize SQLite database
initializeDatabase();

// Seed initial master screenplays into database if empty
function seedInitialScripts() {
  const count = db.prepare('SELECT count(*) as total FROM scripts').get() as { total: number };
  if (count.total === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO scripts (
        id, user_id, title, author, genre, page_count, story_intelligence_score,
        logline, full_raw_text, category_scores_json, scenes_json, characters_json,
        story_beats_json, theme_motifs_json, continuity_issues_json, coverage_json,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const s of MOCK_SCRIPTS) {
      insertStmt.run(
        s.id,
        'usr-demo-elena',
        s.title,
        s.author,
        s.genre,
        s.pageCount,
        s.storyIntelligenceScore,
        s.logline,
        s.fullRawText,
        JSON.stringify(s.categoryScores),
        JSON.stringify(s.scenes),
        JSON.stringify(s.characters),
        JSON.stringify(s.storyBeats),
        JSON.stringify(s.themeMotifs),
        JSON.stringify(s.continuityIssues),
        JSON.stringify(s.coverage),
        now,
        now
      );
    }
    console.log(`[Database] Seeded ${MOCK_SCRIPTS.length} initial screenplays into SQLite.`);
  }
}

seedInitialScripts();

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/scripts', scriptsRouter);
app.use('/api/emails', emailsRouter);
app.use('/api/admin', adminRouter);

// Root & /api Landing Explorer
const renderApiLanding = (req: express.Request, res: express.Response) => {
  const userCount = (db.prepare('SELECT count(*) as count FROM users').get() as any)?.count || 0;
  const scriptCount = (db.prepare('SELECT count(*) as count FROM scripts').get() as any)?.count || 0;
  const emailCount = (db.prepare('SELECT count(*) as count FROM emails').get() as any)?.count || 0;

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      status: 'online',
      service: 'ScriptForge Odyssey Backend API & Database Engine',
      database: 'SQLite (WAL Mode Active)',
      stats: { users: userCount, scripts: scriptCount, emailsSent: emailCount },
      endpoints: {
        health: '/api/health',
        adminStats: '/api/admin/stats',
        adminQuery: 'POST /api/admin/query',
        adminBackup: '/api/admin/backup',
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        demo: 'POST /api/auth/demo',
        scripts: 'GET /api/scripts',
        emails: 'GET /api/emails',
      },
      frontendApp: 'http://localhost:5173',
      timestamp: new Date().toISOString(),
    });
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>ScriptForge Odyssey — Backend API & Master Database Control</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #050B16; color: #E2E8F0; margin: 0; padding: 40px 20px; line-height: 1.6; }
        .card { max-width: 820px; margin: 0 auto; background: #0B1930; border: 1px solid #1E6FB5; border-radius: 20px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(74, 163, 223, 0.2); padding-bottom: 20px; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #F8FAFC; }
        .logo span { color: #4AA3DF; }
        .badge { background: rgba(197, 164, 109, 0.2); border: 1px solid #C5A46D; color: #D6B878; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 24px 0; }
        .stat-box { background: #081426; border: 1px solid rgba(74, 163, 223, 0.25); border-radius: 12px; padding: 16px; text-align: center; }
        .stat-num { font-size: 28px; font-weight: 800; color: #70C7F5; }
        .stat-label { font-size: 11px; text-transform: uppercase; color: #94A3B8; margin-top: 4px; letter-spacing: 1px; }
        .endpoints-list { background: #081426; border-radius: 12px; padding: 18px; border: 1px solid rgba(255,255,255,0.08); font-family: monospace; font-size: 13px; }
        .ep-row { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; }
        .ep-method { color: #34D399; font-weight: bold; }
        .ep-path { color: #CBD5E1; }
        .btn { display: inline-block; background: linear-gradient(135deg, #123C73, #1E6FB5); color: #FFF; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: bold; margin: 8px; }
        .btn-gold { background: linear-gradient(135deg, #8C6D37, #C5A46D); color: #050B16 !important; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div>
            <div class="logo">SCRIPT<span>FORGE</span></div>
            <div style="font-size: 12px; color: #D6B878; margin-top: 4px;">THE ODYSSEY BACKEND API & SQLITE MASTER CONTROLLER</div>
          </div>
          <span class="badge">SERVER & DB ONLINE ⚡</span>
        </div>

        <p style="color: #94A3B8; font-size: 14px;">
          The ScriptForge backend is active and managing database transactions, user authentication, screenplay persistence, and transactional email notifications.
        </p>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-num">${userCount}</div>
            <div class="stat-label">Registered Screenwriters</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${scriptCount}</div>
            <div class="stat-label">Saved Screenplays</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${emailCount}</div>
            <div class="stat-label">Dispatched Emails</div>
          </div>
        </div>

        <h3 style="color: #F8FAFC; font-size: 14px; margin-top: 24px;">Master REST & Database Endpoints</h3>
        <div class="endpoints-list">
          <div class="ep-row"><span class="ep-method">GET</span> <span class="ep-path">/api/admin/stats</span> <span>Database Metrics & Memory</span></div>
          <div class="ep-row"><span class="ep-method">POST</span> <span class="ep-path">/api/admin/query</span> <span>Execute Raw SQL Query</span></div>
          <div class="ep-row"><span class="ep-method">GET</span> <span class="ep-path">/api/admin/backup</span> <span>Download .db SQLite File</span></div>
          <div class="ep-row"><span class="ep-method">POST</span> <span class="ep-path">/api/admin/test-smtp</span> <span>Test Live Email Delivery</span></div>
          <div class="ep-row"><span class="ep-method">POST</span> <span class="ep-path">/api/auth/signup</span> <span>Create Account & Send Email</span></div>
          <div class="ep-row"><span class="ep-method">POST</span> <span class="ep-path">/api/auth/login</span> <span>Authenticate & Security Receipt</span></div>
          <div class="ep-row"><span class="ep-method">GET</span> <span class="ep-path">/api/scripts</span> <span>Fetch User Screenplays</span></div>
        </div>

        <div style="text-align: center; margin-top: 28px;">
          <a href="http://localhost:5173" class="btn">Launch ScriptForge Studio (Port 5173) →</a>
          <a href="/api/admin/backup" class="btn btn-gold">Download SQLite Database (.db) 💾</a>
        </div>
      </div>
    </body>
    </html>
  `);
};

app.get('/', renderApiLanding);
app.get('/api', renderApiLanding);

app.get('/api/health', (_req, res) => {
  const userCount = (db.prepare('SELECT count(*) as count FROM users').get() as any)?.count || 0;
  const scriptCount = (db.prepare('SELECT count(*) as count FROM scripts').get() as any)?.count || 0;
  const emailCount = (db.prepare('SELECT count(*) as count FROM emails').get() as any)?.count || 0;

  res.json({
    status: 'online',
    service: 'ScriptForge Odyssey Backend API',
    database: 'SQLite (WAL Mode Active)',
    stats: { users: userCount, scripts: scriptCount, emailsSent: emailCount },
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[ScriptForge Server] Running on http://localhost:${PORT}`);
});
