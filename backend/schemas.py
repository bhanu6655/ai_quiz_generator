from __future__ import annotations
from typing import List, Literal
from pydantic import BaseModel, Field

Difficulty = Literal["easy", "medium", "hard"]

class QuizItem(BaseModel):
    question: str
    options: List[str] = Field(min_length=4, max_length=4)
    answer: str
    difficulty: Difficulty
    explanation: str

class KeyEntities(BaseModel):
    people: List[str] = []
    organizations: List[str] = []
    locations: List[str] = []

class QuizOutput(BaseModel):
    url: str
    title: str
    summary: str
    key_entities: KeyEntities
    sections: List[str]
    quiz: List[QuizItem] = Field(min_length=5, max_length=10)
    related_topics: List[str] = Field(default_factory=list)

class GenerateRequest(BaseModel):
    url: str
