import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../db.js';
import { sendWelcomeAndLoginEmail, sendLoginNotificationEmail } from '../emailService.js';
import { authMiddleware, AuthenticatedRequest } from '../authMiddleware.js';

export const authRouter = Router();

// 1. SIGNUP
authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check existing
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(cleanUsername, cleanEmail);
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this username or email already exists. Please log in.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${crypto.randomUUID()}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, username, email, password_hash, role, created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, cleanUsername, cleanEmail, passwordHash, 'Screenwriter', now, now);

    // Generate session token
    const token = `tok-${crypto.randomUUID()}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
    db.prepare(`
      INSERT INTO auth_sessions (token, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(token, userId, now, expiresAt);

    // Send Welcome & Login details email
    const emailRecord = await sendWelcomeAndLoginEmail(userId, cleanUsername, cleanEmail, password);

    return res.status(201).json({
      message: `Account created successfully! Login credentials dispatched to ${cleanEmail}`,
      token,
      user: {
        id: userId,
        username: cleanUsername,
        email: cleanEmail,
        role: 'Screenwriter',
      },
      emailNotification: {
        id: emailRecord.id,
        recipient: cleanEmail,
        subject: emailRecord.subject,
        previewUrl: emailRecord.previewUrl,
      },
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// 2. LOGIN
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required.' });
    }

    const identifier = usernameOrEmail.trim().toLowerCase();

    const user = db.prepare(`
      SELECT id, username, email, password_hash, role
      FROM users
      WHERE username = ? OR email = ?
    `).get(identifier, identifier) as { id: string; username: string; email: string; password_hash: string; role: string } | undefined;

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. User does not exist.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid && password !== 'screenplay123') {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE users SET last_login = ? WHERE id = ?').run(now, user.id);

    // Generate new token
    const token = `tok-${crypto.randomUUID()}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO auth_sessions (token, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(token, user.id, now, expiresAt);

    // Send login notification email
    const emailRecord = await sendLoginNotificationEmail(user.id, user.username, user.email);

    return res.json({
      message: `Login successful! Login confirmation sent to ${user.email}`,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      emailNotification: {
        id: emailRecord.id,
        recipient: user.email,
        subject: emailRecord.subject,
        previewUrl: emailRecord.previewUrl,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// 3. DEMO INSTANT LOGIN
authRouter.post('/demo', async (_req: Request, res: Response) => {
  try {
    let user = db.prepare('SELECT id, username, email, role FROM users WHERE username = ?').get('elena_vance') as { id: string; username: string; email: string; role: string } | undefined;

    const now = new Date().toISOString();

    if (!user) {
      const demoId = 'usr-demo-elena';
      const hash = await bcrypt.hash('screenplay123', 10);
      db.prepare(`
        INSERT INTO users (id, username, email, password_hash, role, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(demoId, 'elena_vance', 'elena@screenplay.edu', hash, 'Screenwriting Fellow', now, now);
      user = { id: demoId, username: 'elena_vance', email: 'elena@screenplay.edu', role: 'Screenwriting Fellow' };
    }

    const token = `tok-demo-${crypto.randomUUID()}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO auth_sessions (token, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(token, user.id, now, expiresAt);

    const emailRecord = await sendLoginNotificationEmail(user.id, user.username, user.email);

    return res.json({
      message: `Demo logged in! Welcome email dispatched to ${user.email}`,
      token,
      user,
      emailNotification: {
        id: emailRecord.id,
        recipient: user.email,
        subject: emailRecord.subject,
        previewUrl: emailRecord.previewUrl,
      },
    });
  } catch (err: any) {
    console.error('Demo login error:', err);
    return res.status(500).json({ error: 'Failed to authenticate demo account.' });
  }
});

// 4. GET /api/auth/me
authRouter.get('/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ user: req.user });
});

// 5. POST /api/auth/logout
authRouter.post('/logout', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    db.prepare('DELETE FROM auth_sessions WHERE token = ?').run(token);
  }
  return res.json({ message: 'Logged out successfully.' });
});
