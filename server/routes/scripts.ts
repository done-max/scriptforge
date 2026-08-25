import { Router, Response } from 'express';
import { db } from '../db.js';
import { authMiddleware, AuthenticatedRequest } from '../authMiddleware.js';
import crypto from 'crypto';

export const scriptsRouter = Router();

// Apply auth middleware to all script routes
scriptsRouter.use(authMiddleware);

// 1. GET ALL SCRIPTS FOR USER
scriptsRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const rows = db.prepare(`
      SELECT * FROM scripts
      WHERE user_id = ? OR user_id = 'usr-demo-elena'
      ORDER BY updated_at DESC
    `).all(userId) as any[];

    const formatted = rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      title: r.title,
      author: r.author,
      genre: r.genre,
      pageCount: r.page_count,
      storyIntelligenceScore: r.story_intelligence_score,
      logline: r.logline,
      fullRawText: r.full_raw_text,
      categoryScores: JSON.parse(r.category_scores_json || '{}'),
      scenes: JSON.parse(r.scenes_json || '[]'),
      characters: JSON.parse(r.characters_json || '[]'),
      storyBeats: JSON.parse(r.story_beats_json || '[]'),
      themeMotifs: JSON.parse(r.theme_motifs_json || '[]'),
      continuityIssues: JSON.parse(r.continuity_issues_json || '[]'),
      coverage: JSON.parse(r.coverage_json || '{}'),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      lastEdited: 'Recently',
    }));

    return res.json({ scripts: formatted });
  } catch (err: any) {
    console.error('Error fetching scripts:', err);
    return res.status(500).json({ error: 'Failed to retrieve scripts from database.' });
  }
});

// 2. CREATE / UPLOAD SCRIPT
scriptsRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const {
      title,
      author,
      genre,
      pageCount,
      storyIntelligenceScore,
      logline,
      fullRawText,
      categoryScores,
      scenes,
      characters,
      storyBeats,
      themeMotifs,
      continuityIssues,
      coverage,
    } = req.body;

    if (!title || !fullRawText) {
      return res.status(400).json({ error: 'Script title and raw screenplay text are required.' });
    }

    const scriptId = `script-${crypto.randomUUID()}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO scripts (
        id, user_id, title, author, genre, page_count, story_intelligence_score,
        logline, full_raw_text, category_scores_json, scenes_json, characters_json,
        story_beats_json, theme_motifs_json, continuity_issues_json, coverage_json,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      scriptId,
      userId,
      title,
      author || req.user!.username,
      genre || 'Drama',
      pageCount || 1,
      storyIntelligenceScore || 80,
      logline || 'A dramatic story undergoing screenplay intelligence analysis.',
      fullRawText,
      JSON.stringify(categoryScores || {}),
      JSON.stringify(scenes || []),
      JSON.stringify(characters || []),
      JSON.stringify(storyBeats || []),
      JSON.stringify(themeMotifs || []),
      JSON.stringify(continuityIssues || []),
      JSON.stringify(coverage || {}),
      now,
      now
    );

    const saved = db.prepare('SELECT * FROM scripts WHERE id = ?').get(scriptId) as any;

    return res.status(201).json({
      message: 'Screenplay saved to database successfully.',
      script: {
        id: saved.id,
        userId: saved.user_id,
        title: saved.title,
        author: saved.author,
        genre: saved.genre,
        pageCount: saved.page_count,
        storyIntelligenceScore: saved.story_intelligence_score,
        logline: saved.logline,
        fullRawText: saved.full_raw_text,
        categoryScores: JSON.parse(saved.category_scores_json || '{}'),
        scenes: JSON.parse(saved.scenes_json || '[]'),
        characters: JSON.parse(saved.characters_json || '[]'),
        storyBeats: JSON.parse(saved.story_beats_json || '[]'),
        themeMotifs: JSON.parse(saved.theme_motifs_json || '[]'),
        continuityIssues: JSON.parse(saved.continuity_issues_json || '[]'),
        coverage: JSON.parse(saved.coverage_json || '{}'),
        createdAt: saved.created_at,
        updatedAt: saved.updated_at,
        lastEdited: 'Just now',
      },
    });
  } catch (err: any) {
    console.error('Error creating script:', err);
    return res.status(500).json({ error: 'Failed to save screenplay to database.' });
  }
});

// 3. GET SCRIPT BY ID
scriptsRouter.get('/:id', (req: AuthenticatedRequest, res: Response) => {
  try {
    const scriptId = req.params.id;
    const r = db.prepare('SELECT * FROM scripts WHERE id = ?').get(scriptId) as any;
    if (!r) {
      return res.status(404).json({ error: 'Script not found.' });
    }

    return res.json({
      script: {
        id: r.id,
        userId: r.user_id,
        title: r.title,
        author: r.author,
        genre: r.genre,
        pageCount: r.page_count,
        storyIntelligenceScore: r.story_intelligence_score,
        logline: r.logline,
        fullRawText: r.full_raw_text,
        categoryScores: JSON.parse(r.category_scores_json || '{}'),
        scenes: JSON.parse(r.scenes_json || '[]'),
        characters: JSON.parse(r.characters_json || '[]'),
        storyBeats: JSON.parse(r.story_beats_json || '[]'),
        themeMotifs: JSON.parse(r.theme_motifs_json || '[]'),
        continuityIssues: JSON.parse(r.continuity_issues_json || '[]'),
        coverage: JSON.parse(r.coverage_json || '{}'),
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      },
    });
  } catch (err: any) {
    console.error('Error fetching script:', err);
    return res.status(500).json({ error: 'Failed to retrieve screenplay.' });
  }
});

// 4. UPDATE SCRIPT
scriptsRouter.put('/:id', (req: AuthenticatedRequest, res: Response) => {
  try {
    const scriptId = req.params.id;
    const userId = req.user!.id;
    const existing = db.prepare('SELECT * FROM scripts WHERE id = ?').get(scriptId) as any;
    if (!existing) {
      return res.status(404).json({ error: 'Script not found.' });
    }

    const {
      title,
      fullRawText,
      scenes,
      characters,
      storyBeats,
      themeMotifs,
      continuityIssues,
      storyIntelligenceScore,
      categoryScores,
    } = req.body;

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE scripts SET
        title = COALESCE(?, title),
        full_raw_text = COALESCE(?, full_raw_text),
        scenes_json = COALESCE(?, scenes_json),
        characters_json = COALESCE(?, characters_json),
        story_beats_json = COALESCE(?, story_beats_json),
        theme_motifs_json = COALESCE(?, theme_motifs_json),
        continuity_issues_json = COALESCE(?, continuity_issues_json),
        story_intelligence_score = COALESCE(?, story_intelligence_score),
        category_scores_json = COALESCE(?, category_scores_json),
        updated_at = ?
      WHERE id = ?
    `).run(
      title || null,
      fullRawText || null,
      scenes ? JSON.stringify(scenes) : null,
      characters ? JSON.stringify(characters) : null,
      storyBeats ? JSON.stringify(storyBeats) : null,
      themeMotifs ? JSON.stringify(themeMotifs) : null,
      continuityIssues ? JSON.stringify(continuityIssues) : null,
      storyIntelligenceScore || null,
      categoryScores ? JSON.stringify(categoryScores) : null,
      now,
      scriptId
    );

    return res.json({ message: 'Script updated in database successfully.' });
  } catch (err: any) {
    console.error('Error updating script:', err);
    return res.status(500).json({ error: 'Failed to update screenplay.' });
  }
});

// 5. DELETE SCRIPT
scriptsRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  try {
    const scriptId = req.params.id;
    const userId = req.user!.id;

    db.prepare('DELETE FROM scripts WHERE id = ? AND user_id = ?').run(scriptId, userId);
    return res.json({ message: 'Script deleted from database.' });
  } catch (err: any) {
    console.error('Error deleting script:', err);
    return res.status(500).json({ error: 'Failed to delete screenplay.' });
  }
});
