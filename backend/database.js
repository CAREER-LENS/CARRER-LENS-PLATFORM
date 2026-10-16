const path = require("node:path");
const fs = require("node:fs");
const { DatabaseSync } = require("node:sqlite");

const configuredPath = process.env.DB_PATH || path.join(__dirname, "..", "careerlens.db");
const dbPath = path.isAbsolute(configuredPath) ? configuredPath : path.resolve(process.cwd(), configuredPath);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    education TEXT NOT NULL DEFAULT '',
    experience TEXT NOT NULL DEFAULT '',
    skills_json TEXT NOT NULL,
    interests_json TEXT NOT NULL,
    recommendations_json TEXT NOT NULL
  );
`);

function saveAssessment(profile, recommendations) {
  const statement = db.prepare(`
    INSERT INTO assessments (education, experience, skills_json, interests_json, recommendations_json)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = statement.run(
    profile.education || "",
    profile.experience || "",
    JSON.stringify(profile.skills || []),
    JSON.stringify(profile.interests || []),
    JSON.stringify(recommendations || [])
  );
  return getAssessment(Number(result.lastInsertRowid));
}

function getAssessment(id) {
  const row = db.prepare("SELECT * FROM assessments WHERE id = ?").get(id);
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    education: row.education,
    experience: row.experience,
    skills: JSON.parse(row.skills_json),
    interests: JSON.parse(row.interests_json),
    recommendations: JSON.parse(row.recommendations_json)
  };
}

function getAnalytics() {
  const summary = db.prepare("SELECT COUNT(*) AS totalAssessments FROM assessments").get();
  const recent = db.prepare("SELECT id, created_at AS createdAt FROM assessments ORDER BY id DESC LIMIT 5").all();
  return { totalAssessments: summary.totalAssessments, recentAssessments: recent };
}

module.exports = { saveAssessment, getAssessment, getAnalytics, db };
