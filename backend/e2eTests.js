/**
 * CareerLens — End-to-End & Integration Test Suite
 * 
 * Verifies:
 * 1. Health & Meta endpoints
 * 2. Assessment creation for multiple student archetypes across engineering branches
 * 3. Recommendation correctness & explainability score
 * 4. Database persistence & ID generation
 * 5. Direct assessment retrieval by ID
 * 6. Analytics aggregation
 * 7. Error handling & 400 Bad Request validations
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(data); } catch { parsed = data; }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });
    req.on('error', reject);
    if (body) {
      const payload = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(payload);
    }
    req.end();
  });
}

function get(path) {
  return request({
    hostname: 'localhost',
    port: 3000,
    path,
    method: 'GET'
  });
}

function post(path, body) {
  const payload = JSON.stringify(body);
  return request({
    hostname: 'localhost',
    port: 3000,
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, payload);
}

let passed = 0;
let failed = 0;

function assert(condition, testName, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ✓ ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ ${testName} — ${detail}`);
  }
}

async function runTestSuite() {
  console.log('\n=== Running CareerLens Full Integration & API Suite ===\n');

  // 1. Health check
  const health = await get('/api/health');
  assert(health.status === 200 && health.body.status === 'ok', 'GET /api/health returns 200 ok');

  // 2. Careers list
  const careers = await get('/api/careers');
  assert(careers.status === 200 && careers.body.count === 11, 'GET /api/careers returns 11 supported careers');

  // 3. Validation failure check
  const invalidReq = await post('/api/recommend', { name: 'Incomplete User' });
  assert(invalidReq.status === 400 && invalidReq.body.error === 'Missing required fields', 'POST /api/recommend rejects missing required fields with 400');

  // 4. Case 1: AI Engineer recommendation & DB save
  const aiCandidate = await post('/api/recommend', {
    name: 'Siddharth',
    education: 'B.Tech',
    branch: 'CSE',
    year: '3rd Year',
    skills: 'Python, C++',
    interests: 'AI',
    goal: 'Job'
  });
  assert(
    aiCandidate.status === 200 &&
    aiCandidate.body.success === true &&
    aiCandidate.body.topMatch.career.name === 'AI Engineer' &&
    aiCandidate.body.assessmentId > 0,
    'Siddharth -> AI Engineer (topMatch) & saved with assessment ID'
  );

  // 5. Retrieve saved assessment by ID
  const retrievedAi = await get(`/api/assessment/${aiCandidate.body.assessmentId}`);
  assert(
    retrievedAi.status === 200 &&
    retrievedAi.body.assessment.name === 'Siddharth' &&
    retrievedAi.body.assessment.top_career_name === 'AI Engineer',
    'GET /api/assessment/:id retrieves previously saved assessment correctly'
  );

  // 6. Case 2: Full Stack Developer
  const webCandidate = await post('/api/recommend', {
    name: 'Priya',
    education: 'B.Tech',
    branch: 'CSE',
    year: '4th Year',
    skills: 'HTML, CSS, JavaScript, React',
    interests: 'Web Development',
    goal: 'Job'
  });
  assert(
    webCandidate.body.topMatch.career.name === 'Full Stack Web Developer' &&
    webCandidate.body.skillAnalysis.existing.length > 0 &&
    webCandidate.body.topMatch.roadmap.length > 0,
    'Priya -> Full Stack Web Developer with roadmap and skill analysis'
  );

  // 7. Case 3: Embedded Systems Engineer
  const eceCandidate = await post('/api/recommend', {
    name: 'Rohan',
    education: 'B.Tech',
    branch: 'ECE',
    year: '2nd Year',
    skills: 'C, Arduino',
    interests: 'Embedded Systems',
    goal: 'Internship'
  });
  assert(
    eceCandidate.body.topMatch.career.name === 'Embedded Systems Engineer' &&
    eceCandidate.body.topCareers.length >= 2,
    'Rohan -> Embedded Systems Engineer with multiple enriched top careers'
  );

  // 8. Case 4: VLSI Engineer
  const vlsiCandidate = await post('/api/recommend', {
    name: 'Ananya',
    education: 'B.Tech',
    branch: 'ECE',
    year: '3rd Year',
    skills: 'Verilog, Digital Electronics',
    interests: 'VLSI',
    goal: 'Job'
  });
  assert(
    vlsiCandidate.body.topMatch.career.name === 'VLSI Engineer',
    'Ananya -> VLSI Engineer'
  );

  // 9. Case 5: Mechanical Design Engineer
  const mechCandidate = await post('/api/recommend', {
    name: 'Vikram',
    education: 'B.Tech',
    branch: 'Mechanical',
    year: '4th Year',
    skills: 'AutoCAD, SolidWorks',
    interests: 'Mechanical Design',
    goal: 'Job'
  });
  assert(
    mechCandidate.body.topMatch.career.name === 'Mechanical Design Engineer',
    'Vikram -> Mechanical Design Engineer'
  );

  // 10. Case 6: Civil / Structural Engineer
  const civilCandidate = await post('/api/recommend', {
    name: 'Kavita',
    education: 'B.Tech',
    branch: 'Civil',
    year: '3rd Year',
    skills: 'AutoCAD',
    interests: 'Civil Engineering',
    goal: 'Job'
  });
  assert(
    civilCandidate.body.topMatch.career.name === 'Civil / Structural Engineer',
    'Kavita -> Civil / Structural Engineer'
  );

  // 11. Case 7: Cybersecurity Analyst
  const cyberCandidate = await post('/api/recommend', {
    name: 'Farhan',
    education: 'B.Tech',
    branch: 'CSE',
    year: '3rd Year',
    skills: 'Python, Networking',
    interests: 'Cybersecurity',
    goal: 'Job'
  });
  assert(
    cyberCandidate.body.topMatch.career.name === 'Cybersecurity Analyst',
    'Farhan -> Cybersecurity Analyst'
  );

  // 12. Case 8: Data Scientist
  const dsCandidate = await post('/api/recommend', {
    name: 'Neha',
    education: 'B.Tech',
    branch: 'CSE',
    year: '3rd Year',
    skills: 'Python, SQL',
    interests: 'Data Science',
    goal: 'Job'
  });
  assert(
    dsCandidate.body.topMatch.career.name === 'Data Scientist',
    'Neha -> Data Scientist'
  );

  // 13. Case 9: Multi-Career switching payload completeness
  const multiCheck = aiCandidate.body.topCareers;
  const allHaveRoadmapsAndProjects = multiCheck.every(tc =>
    tc.career &&
    tc.roadmap && tc.roadmap.length > 0 &&
    tc.projects && tc.projects.length > 0 &&
    tc.skillAnalysis &&
    tc.internshipPrep && tc.internshipPrep.length > 0
  );
  assert(
    allHaveRoadmapsAndProjects,
    'TopCareers payload contains complete roadmaps, projects & skill gaps for UI switching'
  );

  // 14. Platform Analytics
  const analytics = await get('/api/analytics');
  assert(
    analytics.status === 200 &&
    analytics.body.totalAssessments >= 8 &&
    Array.isArray(analytics.body.topCareers) &&
    analytics.body.averageMatchScore > 0,
    `GET /api/analytics returns populated metrics (${analytics.body.totalAssessments} assessments logged, avg score: ${analytics.body.averageMatchScore}%)`
  );

  // 15. Static frontend delivery
  const indexHtml = await get('/');
  assert(
    indexHtml.status === 200 &&
    indexHtml.body.includes('CareerLens') &&
    indexHtml.body.includes('id="assessment-modal"'),
    'GET / serves CareerLens single-page application'
  );

  console.log(`\n=== Integration Results: ${passed} passed, ${failed} failed ===\n`);
  if (failed > 0) process.exit(1);
}

runTestSuite().catch(err => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
