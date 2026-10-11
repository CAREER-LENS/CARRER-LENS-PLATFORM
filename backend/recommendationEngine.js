/**
 * CareerLens — Recommendation Engine
 * 
 * Deterministic, explainable career matching system.
 * 
 * Scoring priorities:
 *   1. Interest match   (weight: 40)
 *   2. Skill match      (weight: 30)
 *   3. Branch match     (weight: 20)
 *   4. Education match  (weight:  5)
 *   5. Goal alignment   (weight:  5)
 * 
 * Same input → same output. Always.
 */

const { CAREERS } = require('./careerData');

// ─── Normalization Helpers ──────────────────────────────────────────────

/**
 * Normalize a string for safe matching.
 * Lowercases, trims whitespace, and collapses multiple spaces.
 */
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Parse a comma/semicolon-separated string into a normalized array.
 * Deduplicates entries.
 */
function parseList(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return [...new Set(input.map(normalize).filter(Boolean))];
  }
  return [...new Set(
    input.split(/[,;]+/)
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
  )];
}

/**
 * Safe exact-match check. Prevents "C" from matching "C++" or "CSS".
 * Compares normalized full strings only.
 */
function exactMatch(a, b) {
  return normalize(a) === normalize(b);
}

/**
 * Check if a user item matches any item in a career's keyword list.
 * Uses exact full-string matching to prevent substring issues.
 */
function hasMatch(userItem, careerList) {
  const normalizedUser = normalize(userItem);
  return careerList.some(careerItem => normalize(careerItem) === normalizedUser);
}

/**
 * Count how many user items match the career list.
 * Returns { count, matched }.
 */
function countMatches(userItems, careerList) {
  const matched = [];
  for (const item of userItems) {
    if (hasMatch(item, careerList)) {
      matched.push(item);
    }
  }
  return { count: matched.length, matched };
}

// ─── Scoring Engine ─────────────────────────────────────────────────────

const WEIGHTS = {
  interest: 40,
  skill: 30,
  branch: 20,
  education: 5,
  goal: 5
};

/**
 * Score a single career against user profile.
 * Returns { career, score, maxScore, percentage, reasons }.
 */
function scoreCareer(career, profile) {
  const {
    interests = [],
    skills = [],
    branch = '',
    education = '',
    goal = ''
  } = profile;

  let score = 0;
  const maxScore = WEIGHTS.interest + WEIGHTS.skill + WEIGHTS.branch + WEIGHTS.education + WEIGHTS.goal;
  const reasons = [];

  // 1. Interest matching (highest weight)
  const interestResult = countMatches(interests, career.interestKeywords);
  if (interests.length > 0 && interestResult.count > 0) {
    // Full points if any interest matches — interest is the strongest signal
    const interestScore = WEIGHTS.interest * Math.min(interestResult.count / Math.max(interests.length, 1), 1);
    score += interestScore;
    interestResult.matched.forEach(m => {
      reasons.push({ type: 'interest', text: `Your interest in ${m}`, strength: 'strong' });
    });
  }

  // 2. Skill matching
  const skillResult = countMatches(skills, career.relevantSkills);
  if (skills.length > 0 && skillResult.count > 0) {
    // Proportional scoring: more matching skills = higher score
    const skillRatio = skillResult.count / Math.max(skills.length, 1);
    // But also consider absolute count — having 3 matching skills is better than 1/1
    const absoluteBonus = Math.min(skillResult.count / 3, 1) * 0.3;
    const skillScore = WEIGHTS.skill * Math.min(skillRatio + absoluteBonus, 1);
    score += skillScore;
    skillResult.matched.forEach(m => {
      reasons.push({ type: 'skill', text: `Your ${m} skill`, strength: 'moderate' });
    });
  }

  // 3. Branch matching
  const normalizedBranch = normalize(branch);
  if (normalizedBranch) {
    const branchMatches = career.relevantBranches.some(b => normalize(b) === normalizedBranch);
    if (branchMatches) {
      score += WEIGHTS.branch;
      reasons.push({ type: 'branch', text: `Your ${branch} background`, strength: 'moderate' });
    }
  }

  // 4. Education matching
  const normalizedEdu = normalize(education);
  if (normalizedEdu) {
    // Extract the degree type (e.g., "B.Tech" from "B.Tech CSE")
    const degreeMatch = career.relevantEducation.some(e => normalizedEdu.includes(normalize(e)));
    if (degreeMatch) {
      score += WEIGHTS.education;
      reasons.push({ type: 'education', text: `Your ${education} education`, strength: 'supporting' });
    }
  }

  // 5. Goal alignment — very light signal
  if (normalize(goal)) {
    // All careers support all goals somewhat, but some careers are better for certain goals
    score += WEIGHTS.goal * 0.5; // Baseline for having any goal
    reasons.push({ type: 'goal', text: `Your career goal: ${goal}`, strength: 'supporting' });
  }

  const percentage = Math.round((score / maxScore) * 100);

  return {
    career,
    score,
    maxScore,
    percentage: Math.min(percentage, 99), // Never show 100% — we provide guidance, not certainty
    reasons
  };
}

// ─── Helpers for Skill Gap & Result Enrichment ──────────────────────────

/**
 * Check if a required skill is satisfied by user's normalized skills.
 * Handles alternatives like "Java or C++ or Python", "C/C++", "TensorFlow or PyTorch",
 * and parentheticals like "Database (SQL or MongoDB)" without substring leakage.
 */
function isSkillSatisfied(requiredSkill, userSkillsNormalized) {
  const normReq = normalize(requiredSkill);
  // Split on "or", "/", commas, while stripping parentheses
  const options = normReq
    .replace(/[()]/g, ' ')
    .split(/\s+(?:or|\/)\s+|\s*\/\s*|,/)
    .map(p => p.trim())
    .filter(Boolean);

  for (const opt of options) {
    if (userSkillsNormalized.includes(opt)) {
      return true;
    }
    // Check for multi-word or compound match without single-letter leakage
    const matched = userSkillsNormalized.some(us => {
      if (us === opt) return true;
      if (opt.length >= 4 && (us.includes(opt) || opt.includes(us))) {
        return true;
      }
      return false;
    });
    if (matched) return true;
  }
  return false;
}

/**
 * Calculate missing skills for a career based on user's normalized skills.
 */
function calculateMissingSkills(requiredSkills, userSkillsNormalized) {
  if (!Array.isArray(requiredSkills)) return [];
  return requiredSkills.filter(reqSkill => !isSkillSatisfied(reqSkill, userSkillsNormalized));
}

/**
 * Format a scored career with its skill gap analysis, roadmap, projects, and prep.
 */
function enrichCareerResult(scored, normalizedProfile) {
  const userSkillsNormalized = normalizedProfile.skills.map(normalize);
  const existingSkills = normalizedProfile.skills.filter(s => 
    hasMatch(s, scored.career.relevantSkills)
  );
  const missingSkills = calculateMissingSkills(scored.career.requiredSkills, userSkillsNormalized);

  const confidence = scored.percentage >= 70 ? 'high'
    : scored.percentage >= 50 ? 'medium'
    : 'low';

  return {
    ...scored,
    confidence,
    skillAnalysis: {
      existing: existingSkills,
      missing: missingSkills,
      allUserSkills: normalizedProfile.skills,
      coveragePercentage: scored.career.requiredSkills.length > 0 
        ? Math.round(((scored.career.requiredSkills.length - missingSkills.length) / scored.career.requiredSkills.length) * 100)
        : 100
    },
    roadmap: scored.career.roadmap || [],
    projects: scored.career.projects || [],
    internshipPrep: scored.career.internshipPrep || []
  };
}

// ─── Main Recommendation Function ───────────────────────────────────────

/**
 * Generate career recommendations for a user profile.
 * 
 * @param {Object} profile - User profile
 * @param {string} profile.name - User's name
 * @param {string} profile.education - e.g., "B.Tech"
 * @param {string} profile.branch - e.g., "CSE"
 * @param {string} profile.year - Current year of study
 * @param {string|string[]} profile.skills - Comma-separated or array
 * @param {string|string[]} profile.interests - Comma-separated or array
 * @param {string} profile.goal - Career goal
 * 
 * @returns {Object} { topMatch, topCareers, allScores }
 */
function getRecommendations(profile) {
  // Normalize inputs
  const normalizedProfile = {
    name: (profile.name || '').trim(),
    education: (profile.education || '').trim(),
    branch: (profile.branch || '').trim(),
    year: (profile.year || '').trim(),
    skills: parseList(profile.skills),
    interests: parseList(profile.interests),
    goal: (profile.goal || '').trim()
  };

  // Score every career
  const allScores = CAREERS.map(career => scoreCareer(career, normalizedProfile));

  // Sort by score descending, then by name alphabetically for stability
  allScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.career.name.localeCompare(b.career.name);
  });

  // Enrich top careers with their complete roadmap, projects, internship prep, and skill gap
  const enrichedTopCareers = allScores.slice(0, 3)
    .filter(s => s.percentage > 0)
    .map(s => enrichCareerResult(s, normalizedProfile));

  // Fallback if no careers scored > 0
  const topMatch = enrichedTopCareers.length > 0 
    ? enrichedTopCareers[0] 
    : enrichCareerResult(allScores[0], normalizedProfile);

  return {
    profile: normalizedProfile,
    topMatch,
    topCareers: enrichedTopCareers.length > 0 ? enrichedTopCareers : [topMatch],
    skillAnalysis: topMatch.skillAnalysis,
    roadmap: topMatch.roadmap,
    projects: topMatch.projects,
    internshipPrep: topMatch.internshipPrep
  };
}

module.exports = { 
  getRecommendations, 
  scoreCareer, 
  parseList, 
  normalize, 
  isSkillSatisfied, 
  calculateMissingSkills, 
  CAREERS 
};
