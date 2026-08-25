import { Request, Response, NextFunction } from 'express';
import { db } from './db.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign up or log in.' });
  }

  const token = authHeader.split(' ')[1];
  const session = db.prepare(`
    SELECT u.id, u.username, u.email, u.role, s.expires_at
    FROM auth_sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ?
  `).get(token) as { id: string; username: string; email: string; role: string; expires_at: string } | undefined;

  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }

  req.user = {
    id: session.id,
    username: session.username,
    email: session.email,
    role: session.role,
  };

  next();
}
