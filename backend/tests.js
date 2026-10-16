const assert = require("node:assert/strict");
const { recommendCareers } = require("./recommendationEngine");
const { CAREERS } = require("./careerData");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}

test("career catalogue has multiple careers", () => {
  assert.ok(CAREERS.length >= 5);
});

test("recommendations always return at most three results", () => {
  const result = recommendCareers({ skills: ["Python"], interests: ["AI"] });
  assert.equal(result.recommendations.length, 3);
});

test("Python and AI interest includes AI/ML Engineer", () => {
  const result = recommendCareers({ skills: ["Python"], interests: ["AI"] });
  assert.ok(result.recommendations.some(item => item.career === "AI / ML Engineer"));
});

test("web skills include Web Developer in recommendations", () => {
  const result = recommendCareers({ skills: ["HTML", "CSS", "JavaScript"], interests: ["web development"] });
  assert.ok(result.recommendations.some(item => item.career === "Web Developer"));
});

test("missing skills and roadmaps are returned", () => {
  const result = recommendCareers({ skills: ["Python"], interests: ["machine learning"] });
  const ai = result.recommendations.find(item => item.career === "AI / ML Engineer");
  assert.ok(ai);
  assert.ok(Array.isArray(ai.missingSkills));
  assert.ok(Array.isArray(ai.roadmap));
  assert.ok(Array.isArray(ai.suggestedProjects));
});

test("empty input returns safe recommendations", () => {
  const result = recommendCareers({});
  assert.equal(result.recommendations.length, 3);
});

test("invalid skills shape is rejected by engine", () => {
  assert.throws(() => recommendCareers({ skills: "Python" }), /must be an array/);
});

console.log(`\n${passed}/7 tests passed.`);
if (passed !== 7) process.exitCode = 1;
