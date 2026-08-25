import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'scriptforge.db');
export const db = new Database(dbPath);

// Enable WAL mode for high performance concurrent transactions
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'Screenwriter',
      created_at TEXT NOT NULL,
      last_login TEXT NOT NULL
    );
  `);

  // 2. Auth Sessions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 3. Scripts Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS scripts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      page_count INTEGER NOT NULL,
      story_intelligence_score INTEGER NOT NULL,
      logline TEXT NOT NULL,
      full_raw_text TEXT NOT NULL,
      category_scores_json TEXT NOT NULL,
      scenes_json TEXT NOT NULL,
      characters_json TEXT NOT NULL,
      story_beats_json TEXT NOT NULL,
      theme_motifs_json TEXT NOT NULL,
      continuity_issues_json TEXT NOT NULL,
      coverage_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 4. Emails Dispatched Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      recipient_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      html_body TEXT NOT NULL,
      category TEXT NOT NULL,
      sent_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Seed default demo user if not exists
  const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get('elena_vance');
  if (!existingUser) {
    // Password is 'screenplay123'
    const demoUserId = 'usr-demo-elena';
    db.prepare(`
      INSERT INTO users (id, username, email, password_hash, role, created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      demoUserId,
      'elena_vance',
      'elena@screenplay.edu',
      '$2a$10$w8T0M9f7tZ3yYxHqVz6ZteZgLg7A/7Qz1oX2qR3bF5vN8kM9lP1yS', // prehashed fallback
      'Screenwriting Fellow',
      new Date().toISOString(),
      new Date().toISOString()
    );
  }
}
