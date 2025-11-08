from __future__ import annotations
import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from database import Base, engine, get_db
from orm_models import Quiz
from schemas import GenerateRequest
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz
from utils import dumps, loads, iso


load_dotenv()

app = FastAPI(title="AI Wiki Quiz Generator", version="1.0.0")

origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.post("/generate_quiz")
def generate_quiz_endpoint(req: GenerateRequest, db: Session = Depends(get_db)):
    url = req.url.strip()
    if not (url.startswith("http://") or url.startswith("https://")):
        raise HTTPException(status_code=400, detail="Invalid URL")
    try:
        title, content = scrape_wikipedia(url)
        if len(content) < 400:
            raise HTTPException(status_code=422, detail="Article too short or failed to extract content")
        quiz_payload = generate_quiz(url=url, title=title, content=content)

        record = Quiz(
            url=url,
            title=title,
            scraped_content=content,  # optional bonus
            full_quiz_data=dumps(quiz_payload),
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        return {"id": record.id, **quiz_payload}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
def history(db: Session = Depends(get_db)):
    stmt = select(Quiz).order_by(Quiz.date_generated.desc())
    rows = db.scalars(stmt).all()
    return [
        {
            "id": r.id,
            "url": r.url,
            "title": r.title,
            "date_generated": iso(r.date_generated),
        }
        for r in rows
    ]

@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    row = db.get(Quiz, quiz_id)
    if not row:
        raise HTTPException(status_code=404, detail="Quiz not found")
    data = loads(row.full_quiz_data)
    return {
        "id": row.id,
        "url": row.url,
        "title": row.title,
        "date_generated": iso(row.date_generated),
        "data": data,
    }
