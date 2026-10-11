/**
 * CareerLens — SQLite Database Module
 * 
 * Powered by Node.js built-in node:sqlite (DatabaseSync)
 * Provides persistent storage for user assessments, career recommendations,
 * and platform analytics.
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'careerlens.db');

let db = null;

function initDatabase() {
  try {
    db = new DatabaseSync(DB_PATH);
    
    // Enable WAL mode for high concurrency & performance
    db.exec('PRAGMA journal_mode = WAL;');

    // Create assessments table
    db.exec(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        education TEXT NOT NULL,
        branch TEXT NOT NULL,
        year TEXT,
        skills TEXT NOT NULL,
        interests TEXT NOT NULL,
        goal TEXT,
        top_career_id TEXT NOT NULL,
        top_career_name TEXT NOT NULL,
        match_percentage INTEGER NOT NULL,
        confidence TEXT NOT NULL,
        result_json TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
      CREATE INDEX IF NOT EXISTS idx_assessments_branch ON assessments(branch);
      CREATE INDEX IF NOT EXISTS idx_assessments_top_career ON assessments(top_career_id);
    `);

    console.log(`[Database] Initialized SQLite at: ${DB_PATH}`);
    return db;
  } catch (err) {
    console.error('[Database] Failed to initialize SQLite database:', err);
    throw err;
  }
}

/**
 * Save an assessment result into the database.
 */
function saveAssessment(profile, result) {
  if (!db) initDatabase();

  const insert = db.prepare(`
    INSERT INTO assessments (
      name, education, branch, year, skills, interests, goal,
      top_career_id, top_career_name, match_percentage, confidence, result_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const skillsStr = Array.isArray(profile.skills) ? profile.skills.join(', ') : (profile.skills || '');
  const interestsStr = Array.isArray(profile.interests) ? profile.interests.join(', ') : (profile.interests || '');
  const resultJson = JSON.stringify(result);

  const info = insert.run(
    profile.name || 'Anonymous Student',
    profile.education || '',
    profile.branch || '',
    profile.year || '',
    skillsStr,
    interestsStr,
    profile.goal || '',
    result.topMatch.career.id,
    result.topMatch.career.name,
    result.topMatch.percentage,
    result.topMatch.confidence,
    resultJson
  );

  return {
    id: info.lastInsertRowid,
    createdAt: new Date().toISOString()
  };
}

/**
 * Get an assessment by ID.
 */
function getAssessmentById(id) {
  if (!db) initDatabase();

  const query = db.prepare(`
    SELECT * FROM assessments WHERE id = ?
  `);

  const row = query.get(Number(id));
  if (!row) return null;

  try {
    row.result = JSON.parse(row.result_json);
  } catch {
    row.result = null;
  }
  delete row.result_json;
  return row;
}

/**
 * Get recent assessments list.
 */
function getRecentAssessments(limit = 10) {
  if (!db) initDatabase();

  const query = db.prepare(`
    SELECT id, name, education, branch, year, top_career_name, match_percentage, confidence, created_at
    FROM assessments
    ORDER BY id DESC
    LIMIT ?
  `);

  return query.all(limit);
}

/**
 * Get platform analytics & statistics.
 */
function getAnalytics() {
  if (!db) initDatabase();

  const totalRow = db.prepare('SELECT COUNT(*) as total FROM assessments').get();
  const total = totalRow ? totalRow.total : 0;

  const topCareers = db.prepare(`
    SELECT top_career_name as name, COUNT(*) as count
    FROM assessments
    GROUP BY top_career_name
    ORDER BY count DESC
    LIMIT 5
  `).all();

  const topBranches = db.prepare(`
    SELECT branch, COUNT(*) as count
    FROM assessments
    GROUP BY branch
    ORDER BY count DESC
    LIMIT 5
  `).all();

  const avgScoreRow = db.prepare(`
    SELECT AVG(match_percentage) as avg_score
    FROM assessments
  `).get();

  return {
    totalAssessments: total,
    averageMatchScore: avgScoreRow && avgScoreRow.avg_score ? Math.round(avgScoreRow.avg_score) : 0,
    topCareers,
    topBranches
  };
}

module.exports = {
  initDatabase,
  saveAssessment,
  getAssessmentById,
  getRecentAssessments,
  getAnalytics
};
