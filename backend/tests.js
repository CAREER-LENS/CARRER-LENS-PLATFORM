/**
 * CareerLens — Recommendation Logic Tests
 * 
 * All 12 required tests from the spec.
 * Run: node tests.js
 */

const { getRecommendations } = require('./recommendationEngine');

let passed = 0;
let failed = 0;

function test(name, profile, expectedCareer) {
  const result = getRecommendations(profile);
  const topCareer = result.topMatch.career.name;
  const ok = topCareer === expectedCareer;
  
  if (ok) {
    passed++;
    console.log(`  ✓ ${name}: ${topCareer} (${result.topMatch.percentage}%)`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    Expected: ${expectedCareer}`);
    console.log(`    Got:      ${topCareer} (${result.topMatch.percentage}%)`);
    // Show top 3 for debugging
    result.topCareers.forEach((c, i) => {
      console.log(`    #${i+1}: ${c.career.name} — ${c.percentage}% (score: ${c.score.toFixed(2)})`);
    });
  }
}

console.log('\n=== CareerLens Recommendation Engine Tests ===\n');

// TEST 1: B.Tech CSE + Python, C++ + AI → AI Engineer
test('TEST 1: CSE + Python,C++ + AI', {
  education: 'B.Tech',
  branch: 'CSE',
  skills: 'Python, C++',
  interests: 'AI'
}, 'AI Engineer');

// TEST 2: B.Tech AIML + Python + AI → AI Engineer
test('TEST 2: AIML + Python + AI', {
  education: 'B.Tech',
  branch: 'AIML',
  skills: 'Python',
  interests: 'AI'
}, 'AI Engineer');

// TEST 3: B.Tech CSE + Python, HTML, CSS + Web Development → Full Stack Web Developer
test('TEST 3: CSE + Python,HTML,CSS + Web Dev', {
  education: 'B.Tech',
  branch: 'CSE',
  skills: 'Python, HTML, CSS',
  interests: 'Web Development'
}, 'Full Stack Web Developer');

// TEST 4: B.Tech CSE + Python, SQL + Data Science → Data Scientist
test('TEST 4: CSE + Python,SQL + Data Science', {
  education: 'B.Tech',
  branch: 'CSE',
  skills: 'Python, SQL',
  interests: 'Data Science'
}, 'Data Scientist');

// TEST 5: B.Tech CSE + Python, Networking + Cybersecurity → Cybersecurity Analyst
test('TEST 5: CSE + Python,Networking + Cybersecurity', {
  education: 'B.Tech',
  branch: 'CSE',
  skills: 'Python, Networking',
  interests: 'Cybersecurity'
}, 'Cybersecurity Analyst');

// TEST 6: B.Tech CSE + Java, C++ + Programming → Software Developer
test('TEST 6: CSE + Java,C++ + Programming', {
  education: 'B.Tech',
  branch: 'CSE',
  skills: 'Java, C++',
  interests: 'Programming'
}, 'Software Developer');

// TEST 7: B.Tech ECE + C, Arduino + Embedded Systems → Embedded Systems Engineer
test('TEST 7: ECE + C,Arduino + Embedded Systems', {
  education: 'B.Tech',
  branch: 'ECE',
  skills: 'C, Arduino',
  interests: 'Embedded Systems'
}, 'Embedded Systems Engineer');

// TEST 8: B.Tech ECE + Verilog, Digital Electronics + VLSI → VLSI Engineer
test('TEST 8: ECE + Verilog,Digital Electronics + VLSI', {
  education: 'B.Tech',
  branch: 'ECE',
  skills: 'Verilog, Digital Electronics',
  interests: 'VLSI'
}, 'VLSI Engineer');

// TEST 9: B.Tech Mechanical + AutoCAD, SolidWorks + Mechanical Design → Mechanical Design Engineer
test('TEST 9: Mechanical + AutoCAD,SolidWorks + Mech Design', {
  education: 'B.Tech',
  branch: 'Mechanical',
  skills: 'AutoCAD, SolidWorks',
  interests: 'Mechanical Design'
}, 'Mechanical Design Engineer');

// TEST 10: B.Tech Civil + AutoCAD + Civil Engineering → Civil / Structural Engineer
test('TEST 10: Civil + AutoCAD + Civil Engineering', {
  education: 'B.Tech',
  branch: 'Civil',
  skills: 'AutoCAD',
  interests: 'Civil Engineering'
}, 'Civil / Structural Engineer');

// TEST 11: B.Tech CSE + Python + AI, Web Development — deterministic multi-interest
// TEST 11: Multi-interest — just verify it doesn't crash
try {
  const r11 = getRecommendations({ education: 'B.Tech', branch: 'CSE', skills: 'Python', interests: 'AI, Web Development' });
  if (r11.topMatch && r11.topMatch.career) {
    passed++;
    console.log(`  ✓ TEST 11: Multi-interest handled — top: "${r11.topMatch.career.name}" (${r11.topMatch.percentage}%)`);
  } else {
    failed++;
    console.log(`  ✗ TEST 11: No result for multi-interest input`);
  }
} catch (e) {
  failed++;
  console.log(`  ✗ TEST 11: CRASHED — ${e.message}`);
}

// Verify TEST 11 determinism
const r11a = getRecommendations({ education: 'B.Tech', branch: 'CSE', skills: 'Python', interests: 'AI, Web Development' });
const r11b = getRecommendations({ education: 'B.Tech', branch: 'CSE', skills: 'Python', interests: 'AI, Web Development' });
if (r11a.topMatch.career.name === r11b.topMatch.career.name) {
  passed++;
  console.log(`  ✓ TEST 11b: Deterministic — always returns "${r11a.topMatch.career.name}" (${r11a.topMatch.percentage}%)`);
} else {
  failed++;
  console.log(`  ✗ TEST 11b: NOT deterministic! Got "${r11a.topMatch.career.name}" and "${r11b.topMatch.career.name}"`);
}

// TEST 12: Unknown interest — should not crash, should return with low confidence
try {
  const r12 = getRecommendations({
    education: 'B.Tech',
    branch: 'CSE',
    skills: 'Python',
    interests: 'Quantum Underwater Basket Weaving'
  });
  if (r12.topMatch && r12.topMatch.career) {
    passed++;
    console.log(`  ✓ TEST 12: Unknown interest handled — fallback: "${r12.topMatch.career.name}" (${r12.topMatch.percentage}%, confidence: ${r12.topMatch.confidence})`);
  } else {
    failed++;
    console.log(`  ✗ TEST 12: No result returned for unknown interest`);
  }
} catch (e) {
  failed++;
  console.log(`  ✗ TEST 12: CRASHED with unknown interest — ${e.message}`);
}
// TEST 13: EEE + MATLAB, Circuit Analysis + Electrical Engineering → Electrical Engineer
test('TEST 13: EEE + MATLAB,Circuit Analysis + Electrical Eng', {
  education: 'B.Tech',
  branch: 'EEE',
  skills: 'MATLAB, Circuit Analysis',
  interests: 'Electrical Engineering'
}, 'Electrical Engineer');

// TEST 14: Skill gap analysis verification
try {
  const r14 = getRecommendations({
    education: 'B.Tech',
    branch: 'CSE',
    skills: 'Python',
    interests: 'AI'
  });
  const missing = r14.skillAnalysis.missing;
  const hasPythonInMissing = missing.includes('Python');
  const hasDeepLearningInMissing = missing.some(s => s.toLowerCase().includes('deep learning'));
  if (!hasPythonInMissing && hasDeepLearningInMissing) {
    passed++;
    console.log(`  ✓ TEST 14: Skill gap analysis correctly identifies Python is present and Deep Learning is missing`);
  } else {
    failed++;
    console.log(`  ✗ TEST 14: Skill gap analysis failed. Missing skills:`, missing);
  }
} catch (e) {
  failed++;
  console.log(`  ✗ TEST 14: CRASHED — ${e.message}`);
}

// TEST 15: Substring safety (C != C++, CSS != C)
const { isSkillSatisfied } = require('./recommendationEngine');
if (!isSkillSatisfied('C', ['css']) && !isSkillSatisfied('C++', ['c']) && isSkillSatisfied('C++', ['c++'])) {
  passed++;
  console.log(`  ✓ TEST 15: Substring collision safety verified (CSS != C, C != C++, C++ == C++)`);
} else {
  failed++;
  console.log(`  ✗ TEST 15: Substring safety failed!`);
}

// TEST 16: Top careers enrichment (all top careers have complete metadata)
try {
  const r16 = getRecommendations({
    education: 'B.Tech',
    branch: 'CSE',
    skills: 'Python, SQL',
    interests: 'Data Science'
  });
  const allEnriched = r16.topCareers.every(c => 
    c.roadmap && c.roadmap.length > 0 &&
    c.projects && c.projects.length > 0 &&
    c.skillAnalysis && c.internshipPrep && c.internshipPrep.length > 0
  );
  if (allEnriched && r16.topCareers.length >= 2) {
    passed++;
    console.log(`  ✓ TEST 16: Top careers are all fully enriched with roadmaps, projects, and skill analyses`);
  } else {
    failed++;
    console.log(`  ✗ TEST 16: Top careers not fully enriched!`);
  }
} catch (e) {
  failed++;
  console.log(`  ✗ TEST 16: CRASHED — ${e.message}`);
}

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  process.exit(1);
}
