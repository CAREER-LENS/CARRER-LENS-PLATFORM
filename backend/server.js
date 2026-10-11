/**
 * CareerLens — Backend API Server
 * 
 * Endpoints:
 *   POST /api/recommend      — Get and save career recommendations
 *   GET  /api/assessment/:id — Retrieve a saved assessment by ID
 *   GET  /api/analytics      — Platform analytics (aggregate statistics)
 *   GET  /api/careers        — List all supported careers
 *   GET  /api/health         — Health check
 * 
 * Run: npm start (port 3000)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { getRecommendations, CAREERS } = require('./recommendationEngine');
const database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
try {
  database.initDatabase();
} catch (err) {
  console.error('[Server] Warning: Database initialization error:', err.message);
}

// ─── Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerLens API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * Get all supported careers (metadata only)
 */
app.get('/api/careers', (req, res) => {
  const careers = CAREERS.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    description: c.description,
    interestKeywords: c.interestKeywords,
    relevantBranches: c.relevantBranches,
    requiredSkills: c.requiredSkills
  }));
  res.json({ success: true, count: careers.length, careers });
});

/**
 * Get platform analytics
 */
app.get('/api/analytics', (req, res) => {
  try {
    const stats = database.getAnalytics();
    res.json({ success: true, ...stats });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
});

/**
 * Get saved assessment by ID
 */
app.get('/api/assessment/:id', (req, res) => {
  try {
    const { id } = req.params;
    const assessment = database.getAssessmentById(id);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found', message: `No assessment found with ID ${id}` });
    }
    res.json({ success: true, assessment });
  } catch (err) {
    console.error('Get assessment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get career recommendations & persist assessment
 * 
 * Body: { name, education, branch, year, skills, interests, goal }
 */
app.post('/api/recommend', (req, res) => {
  try {
    const { name, education, branch, year, skills, interests, goal } = req.body;

    // Validate required fields
    if (!education || !branch || !skills || !interests) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide education, branch, skills, and interests.',
        required: ['education', 'branch', 'skills', 'interests']
      });
    }

    // Sanitize and shape profile
    const profile = {
      name: typeof name === 'string' ? name.slice(0, 100).trim() : 'Anonymous Student',
      education: String(education).slice(0, 50).trim(),
      branch: String(branch).slice(0, 50).trim(),
      year: typeof year === 'string' ? year.slice(0, 50).trim() : '',
      skills,
      interests,
      goal: typeof goal === 'string' ? goal.slice(0, 100).trim() : ''
    };

    // Calculate recommendations
    const result = getRecommendations(profile);

    // Save assessment to database
    let saved = null;
    try {
      saved = database.saveAssessment(profile, result);
    } catch (dbErr) {
      console.error('[Server] Warning: Failed to save assessment to database:', dbErr.message);
    }

    res.json({
      success: true,
      assessmentId: saved ? saved.id : null,
      ...result
    });
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Favicon handler (prevent browser 404 console errors)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// ─── 404 Handler ────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', message: `Route ${req.url} not found` });
});

// ─── Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: 'Something went wrong.' });
});

// ─── Start Server ───────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 CareerLens running at:`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://127.0.0.1:${PORT}`);
    console.log(`   Health:  http://localhost:${PORT}/api/health`);
    console.log(`   Careers: http://localhost:${PORT}/api/careers`);
    console.log(`   Recommend: POST http://localhost:${PORT}/api/recommend\n`);
  });
}

module.exports = app;
