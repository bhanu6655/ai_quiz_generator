from __future__ import annotations
QUIZ_SYSTEM_PROMPT = (
    "You are an assistant that turns Wikipedia article text into a factual quiz."
    " Keep all facts grounded strictly in the article."
)

QUIZ_USER_PROMPT = (
    "From the following article text, produce a JSON that matches the provided schema."
    " Rules: 1) 5-10 MCQs; 2) each with 4 options; 3) include correct answer string,"
    " a one-line explanation citing the section head, and difficulty level;"
    " 4) also return a concise summary, list of key sections, key entities (people,"
    " organizations, locations) and a list of related Wikipedia topics."
    "\n\nArticle Title: {title}\nURL: {url}\n---\n{content}"
)
