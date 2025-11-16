AlgoBotD FullStack Starter (Next.js frontend + FastAPI backend)
--------------------------------------------------------------
What's included:
- frontend/    (Next.js app router scaffold + simple mock APIs)
- backend/     (FastAPI scaffold with mock strategy)
- README files with quick start instructions

Quick start (local):
1) Frontend:
   cd frontend
   npm install
   npm run dev
2) Backend:
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload

Deploy:
- Frontend: Vercel (connect GitHub repository)
- Backend: Render / Railway / Fly / Heroku (use requirements.txt or Dockerfile)

Notes:
- This is a starter scaffold. You must replace the mock product APIs with Delta API calls and implement secure API key storage, database, authentication and real strategy logic.
