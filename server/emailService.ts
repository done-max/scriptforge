import nodemailer from 'nodemailer';
import { db } from './db.js';
import crypto from 'crypto';

export interface EmailRecord {
  id: string;
  userId: string;
  recipientEmail: string;
  subject: string;
  htmlBody: string;
  category: 'welcome_login' | 'security_login' | 'script_coverage';
  sentAt: string;
  previewUrl?: string;
}

export interface SmtpConfig {
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  pass?: string;
  from?: string;
}

let runtimeConfig: SmtpConfig | null = null;
let transporterPromise: Promise<nodemailer.Transporter> | null = null;

export function updateRuntimeSmtpConfig(config: SmtpConfig) {
  runtimeConfig = config;
  transporterPromise = null; // reset transporter
}

export function getSmtpStatus() {
  const host = runtimeConfig?.host || process.env.SMTP_HOST;
  const user = runtimeConfig?.user || process.env.SMTP_USER;
  return {
    isConfigured: Boolean(host && user),
    host: host || 'Ethereal Test SMTP (Default)',
    user: user ? user.replace(/(.{2})(.*)(@.*)/, '$1***$3') : 'Auto-generated',
  };
}

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    const host = runtimeConfig?.host || process.env.SMTP_HOST;
    const user = runtimeConfig?.user || process.env.SMTP_USER;
    const pass = runtimeConfig?.pass || process.env.SMTP_PASS;
    const port = runtimeConfig?.port || Number(process.env.SMTP_PORT) || 587;
    const secure = runtimeConfig?.secure !== undefined ? runtimeConfig.secure : process.env.SMTP_SECURE === 'true';

    // 1. If custom SMTP is provided
    if (host && user && pass) {
      console.log(`[Email Service] Using SMTP server: ${host}:${port}`);
      return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
    }

    // 2. Auto-create an Ethereal test account for real SMTP email dispatch & previewing
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[Email Service] Created SMTP Ethereal test mailer: ${testAccount.user}`);
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.warn('[Email Service] Fallback to JSON transport:', err);
      return nodemailer.createTransport({ jsonTransport: true });
    }
  })();

  return transporterPromise;
}

export async function sendWelcomeAndLoginEmail(
  userId: string,
  username: string,
  email: string,
  rawPassword?: string
): Promise<EmailRecord> {
  const emailId = `email-${crypto.randomUUID()}`;
  const sentAt = new Date().toISOString();
  const subject = `Welcome to ScriptForge — Your Login Details & Screenwriter Pass`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050B16; color: #F2F5F8; margin: 0; padding: 24px; }
        .container { max-width: 580px; margin: 0 auto; background: #0B1930; border: 1px solid #1E6FB5; border-radius: 16px; overflow: hidden; }
        .header { background: #081426; padding: 28px; text-align: center; border-bottom: 2px solid #C5A46D; }
        .logo { font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #F2F5F8; }
        .logo span { color: #4AA3DF; }
        .content { padding: 32px; font-size: 14px; line-height: 1.6; color: #CBD5E1; }
        .credentials-box { background: #050B16; border: 1px solid #C5A46D; border-radius: 12px; padding: 18px; margin: 20px 0; }
        .cred-item { margin-bottom: 8px; font-family: monospace; font-size: 13px; color: #F2F5F8; }
        .cred-label { color: #70C7F5; font-weight: bold; }
        .footer { background: #050B16; padding: 18px; text-align: center; font-size: 11px; color: #718096; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SCRIPT<span>FORGE</span></div>
          <div style="font-size: 11px; color: #D6B878; margin-top: 4px; letter-spacing: 1px;">THE ODYSSEY SCREENPLAY STUDIO</div>
        </div>
        <div class="content">
          <h2 style="color: #F2F5F8; margin-top: 0; font-size: 18px;">Welcome to the Writer's Room, ${username}!</h2>
          <p>Your ScriptForge account has been activated. You now have full access to our AI Story Consultant, authentic Screenplay Reader, and Rewrite Studio.</p>
          
          <div class="credentials-box">
            <div style="font-size: 11px; color: #D6B878; font-weight: bold; margin-bottom: 8px; text-transform: uppercase;">Your Screenwriter Account Credentials</div>
            <div class="cred-item"><span class="cred-label">Username:</span> ${username}</div>
            <div class="cred-item"><span class="cred-label">Registered Email:</span> ${email}</div>
            ${rawPassword ? `<div class="cred-item"><span class="cred-label">Temporary Password:</span> ${rawPassword}</div>` : ''}
            <div class="cred-item"><span class="cred-label">Account Status:</span> Active & Verified</div>
          </div>

          <p>Please keep this login receipt for your records. You can now upload screenplays in PDF, Fountain, TXT, or FDX format and begin reading and refining your pages.</p>
          
          <p style="font-style: italic; color: #94A3B8; border-left: 2px solid #4AA3DF; padding-left: 12px; margin-top: 20px;">
            "Don't just write better pages. Understand why they work."
          </p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} ScriptForge Intelligence Studio • Confidential Screenwriter Dispatch
        </div>
      </div>
    </body>
    </html>
  `;

  let previewUrl: string | undefined;
  try {
    const fromAddress = runtimeConfig?.from || process.env.SMTP_FROM || process.env.SMTP_USER || '"ScriptForge Intelligence Studio" <notifications@scriptforge.studio>';
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject,
      html: htmlBody,
    });
    previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
    if (previewUrl) {
      console.log(`[Email Sent] Preview URL for ${email}: ${previewUrl}`);
    }
  } catch (err) {
    console.warn('[Email Delivery Warning]:', err);
  }

  db.prepare(`
    INSERT INTO emails (id, user_id, recipient_email, subject, html_body, category, sent_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(emailId, userId, email, subject, htmlBody, 'welcome_login', sentAt);

  return {
    id: emailId,
    userId,
    recipientEmail: email,
    subject,
    htmlBody,
    category: 'welcome_login',
    sentAt,
    previewUrl,
  };
}

export async function sendLoginNotificationEmail(
  userId: string,
  username: string,
  email: string
): Promise<EmailRecord> {
  const emailId = `email-${crypto.randomUUID()}`;
  const sentAt = new Date().toISOString();
  const subject = `ScriptForge Security Alert: New Login for @${username}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050B16; color: #F2F5F8; margin: 0; padding: 24px; }
        .container { max-width: 580px; margin: 0 auto; background: #0B1930; border: 1px solid #1E6FB5; border-radius: 16px; overflow: hidden; }
        .header { background: #081426; padding: 20px; text-align: center; border-bottom: 2px solid #4AA3DF; }
        .logo { font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #F2F5F8; }
        .logo span { color: #4AA3DF; }
        .content { padding: 28px; font-size: 13px; line-height: 1.6; color: #CBD5E1; }
        .box { background: #050B16; border: 1px solid rgba(74, 163, 223, 0.3); border-radius: 10px; padding: 14px; margin: 16px 0; }
        .footer { background: #050B16; padding: 16px; text-align: center; font-size: 10px; color: #718096; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SCRIPT<span>FORGE</span></div>
        </div>
        <div class="content">
          <h3 style="color: #70C7F5; margin-top: 0;">Successful Studio Login Detected</h3>
          <p>Hello <strong>${username}</strong>,</p>
          <p>Your ScriptForge workspace was just accessed successfully. Here are your session parameters:</p>
          <div class="box">
            <div><strong>Time:</strong> ${new Date().toUTCString()}</div>
            <div><strong>Account Email:</strong> ${email}</div>
            <div><strong>Access Location:</strong> Screenplay Studio Session</div>
          </div>
          <p>If you did not initiate this login, please secure your account immediately.</p>
        </div>
        <div class="footer">
          ScriptForge Story Intelligence System • Automated Security Service
        </div>
      </div>
    </body>
    </html>
  `;

  let previewUrl: string | undefined;
  try {
    const fromAddress = runtimeConfig?.from || process.env.SMTP_FROM || process.env.SMTP_USER || '"ScriptForge Intelligence Studio" <notifications@scriptforge.studio>';
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject,
      html: htmlBody,
    });
    previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
    if (previewUrl) {
      console.log(`[Email Sent] Preview URL for ${email}: ${previewUrl}`);
    }
  } catch (err) {
    console.warn('[Email Delivery Warning]:', err);
  }

  db.prepare(`
    INSERT INTO emails (id, user_id, recipient_email, subject, html_body, category, sent_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(emailId, userId, email, subject, htmlBody, 'security_login', sentAt);

  return {
    id: emailId,
    userId,
    recipientEmail: email,
    subject,
    htmlBody,
    category: 'security_login',
    sentAt,
    previewUrl,
  };
}
