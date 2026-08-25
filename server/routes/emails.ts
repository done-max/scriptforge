import { Router, Response } from 'express';
import { db } from '../db.js';
import { authMiddleware, AuthenticatedRequest } from '../authMiddleware.js';

export const emailsRouter = Router();

emailsRouter.use(authMiddleware);

// GET ALL EMAILS SENT TO LOGGED-IN USER
emailsRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const emails = db.prepare(`
      SELECT id, user_id as userId, recipient_email as recipientEmail, subject, html_body as htmlBody, category, sent_at as sentAt
      FROM emails
      WHERE user_id = ?
      ORDER BY sent_at DESC
    `).all(userId);

    return res.json({ emails });
  } catch (err: any) {
    console.error('Error fetching emails:', err);
    return res.status(500).json({ error: 'Failed to retrieve dispatched emails.' });
  }
});
