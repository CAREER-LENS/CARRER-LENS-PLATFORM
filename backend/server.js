const express = require("express");
const cors = require("cors");
const { CAREERS } = require("./careerData");
const { recommendCareers } = require("./recommendationEngine");
const { saveAssessment, getAssessment, getAnalytics } = require("./database");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map(value => value.trim()) }));
app.use(express.json({ limit: "32kb" }));

app.get("/", (_req, res) => {
  res.json({ name: "CareerLens Backend API", status: "running", health: "/api/health", documentation: "See README.md" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "CareerLens Backend API", timestamp: new Date().toISOString() });
});

app.get("/api/careers", (_req, res) => {
  res.json({ count: CAREERS.length, careers: CAREERS });
});

app.post("/api/recommend", (req, res) => {
  try {
    const body = req.body || {};
    const skills = body.skills === undefined ? [] : body.skills;
    const interests = body.interests === undefined ? [] : body.interests;
    if (!Array.isArray(skills) || !Array.isArray(interests)) {
      return res.status(400).json({ error: "skills and interests must be arrays of strings." });
    }
    const result = recommendCareers({
      skills,
      interests,
      education: body.education,
      experience: body.experience
    });
    const saved = saveAssessment(result.profile, result.recommendations);
    return res.status(201).json({ assessmentId: saved.id, createdAt: saved.createdAt, ...result });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Invalid recommendation request." });
  }
});

app.get("/api/assessment/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: "Assessment ID must be a positive integer." });
  const assessment = getAssessment(id);
  if (!assessment) return res.status(404).json({ error: "Assessment not found." });
  res.json(assessment);
});

app.get("/api/analytics", (_req, res) => {
  res.json(getAnalytics());
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  console.error(error);
  return res.status(500).json({ error: "Internal server error." });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`CareerLens Backend API running at http://localhost:${PORT}`));
}

module.exports = { app };
