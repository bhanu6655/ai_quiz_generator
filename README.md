# AI Wiki Quiz Generator

## Quick Start

### 1) Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env with your GEMINI_API_KEY and optional DATABASE_URL
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Notes:
- For local dev, the backend falls back to SQLite `quiz_history.db` if `DATABASE_URL` isn't set.
- For assignment grading, point `DATABASE_URL` to MySQL or PostgreSQL.

### 2) Frontend
```bash
cd ../frontend
npm install
# Optional: create .env and set VITE_API_BASE=http://localhost:8000
npm run dev
```

Open http://localhost:5173

## Endpoints
- `POST /generate_quiz` — body: `{ "url": "https://en.wikipedia.org/wiki/Alan_Turing" }`
- `GET /history`
- `GET /quiz/{id}`

## Prompting
See `backend/prompts.py` and `backend/llm_quiz_generator.py` for the LangChain chain with `JsonOutputParser` to enforce the `schemas.QuizOutput` shape.

## Sample Data
See `sample_data/` for example URLs and a sample JSON.



https://github.com/user-attachments/assets/4e96ed57-8b6f-4a45-870d-8db86a04fc34


