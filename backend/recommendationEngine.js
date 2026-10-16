const { CAREERS } = require("./careerData");

function normalizeList(value, fieldName) {
  if (value === undefined || value === null || value === "") return [];
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array of strings.`);
  }
  if (value.length > 50 || value.some(item => typeof item !== "string" || item.length > 80)) {
    throw new Error(`${fieldName} must contain at most 50 short strings.`);
  }
  return [...new Set(value.map(item => item.trim()).filter(Boolean))];
}

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9+#/. -]/g, " ").replace(/\s+/g, " ").trim();
}

function recommendCareers(input) {
  const skills = normalizeList(input.skills, "skills");
  const interests = normalizeList(input.interests, "interests");
  const education = typeof input.education === "string" ? input.education.trim().slice(0, 120) : "";
  const experience = typeof input.experience === "string" ? input.experience.trim().slice(0, 500) : "";

  const normalizedSkills = skills.map(normalizeText);
  const normalizedInterests = interests.map(normalizeText);

  const results = CAREERS.map(career => {
    const matchedSkills = career.skills.filter(required =>
      normalizedSkills.some(userSkill => userSkill === normalizeText(required) || userSkill.includes(normalizeText(required)) || normalizeText(required).includes(userSkill))
    );
    const matchedInterests = career.interests.filter(required =>
      normalizedInterests.some(userInterest => userInterest === normalizeText(required) || userInterest.includes(normalizeText(required)) || normalizeText(required).includes(userInterest))
    );

    const skillScore = matchedSkills.length / career.skills.length;
    const interestScore = career.interests.length ? matchedInterests.length / career.interests.length : 0;
    const rawScore = (skillScore * 70) + (interestScore * 30);
    const score = Math.max(0, Math.min(99, Math.round(rawScore)));

    const missingSkills = career.skills.filter(skill => !matchedSkills.includes(skill));
    return {
      careerId: career.id,
      career: career.title,
      description: career.description,
      matchScore: score,
      matchedSkills,
      missingSkills,
      roadmap: career.roadmap,
      suggestedProjects: career.projects,
      reason: matchedSkills.length || matchedInterests.length
        ? `Matched ${matchedSkills.length} skill(s) and ${matchedInterests.length} interest area(s).`
        : "This is a possible path to explore. Add more skills and interests for a more tailored match."
    };
  });

  results.sort((a, b) => b.matchScore - a.matchScore || a.career.localeCompare(b.career));
  return {
    profile: { education, experience, skills, interests },
    recommendations: results.slice(0, 3),
    note: "Match scores are heuristic guidance, not a guarantee of career suitability."
  };
}

module.exports = { recommendCareers };
