# CareerLens — Task 2 Backend

Node.js + Express + SQLite backend API for the CareerLens student career-guidance project.

## Requirements
- Node.js **22.5 or newer** (uses the built-in `node:sqlite` module).
- npm.

## Install and run
```bash
npm install
npm start
```
Server starts at `http://localhost:3000`.

Run the unit tests:
```bash
npm test
```

## API endpoints

### `GET /api/health`
Returns service health status.

### `GET /api/careers`
Returns the career catalogue, required skills, roadmaps and project ideas.

### `POST /api/recommend`
Request JSON:
```json
{
  "education": "B.Tech CSE",
  "experience": "Beginner",
  "skills": ["Python", "SQL"],
  "interests": ["AI", "data analysis"]
}
```
Returns up to three career recommendations with heuristic match scores, matched skills, missing skills, roadmaps, and project ideas. The assessment is saved in SQLite and its `assessmentId` is returned.

### `GET /api/assessment/:id`
Returns a saved assessment.

### `GET /api/analytics`
Returns total saved assessments and the five most recent assessment IDs/timestamps.

## Example using PowerShell
```powershell
Invoke-RestMethod http://localhost:3000/api/health
$body = @{
  education = "B.Tech CSE"
  experience = "Beginner"
  skills = @("Python", "SQL")
  interests = @("AI", "data analysis")
} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/recommend -ContentType "application/json" -Body $body
```

## Connect the frontend
The provided HTML is a static home page and currently links to `login.html`. It does not yet submit student skills to this API. The frontend developer must connect the recommendation form to `POST /api/recommend` using `fetch`. This backend does not claim to implement login/authentication.

## Notes
- SQLite data files are generated at runtime and are excluded from Git.
- Match scores are rule-based guidance, not a guarantee of career suitability.
- Configure `PORT`, `DB_PATH`, and `CORS_ORIGIN` with environment variables if needed.
