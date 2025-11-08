from __future__ import annotations
import os
from typing import Dict
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_google_genai import ChatGoogleGenerativeAI
from schemas import QuizOutput
from prompts import QUIZ_SYSTEM_PROMPT, QUIZ_USER_PROMPT


load_dotenv()

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-exp")
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set. See backend/.env.example")

# Setup model
model = ChatGoogleGenerativeAI(model=MODEL_NAME, api_key=API_KEY, temperature=0.2)

# Pydantic schema enforcement through JsonOutputParser
parser = JsonOutputParser(pydantic_object=QuizOutput)

prompt = PromptTemplate(
    template=(
        "{system}\n\n"
        "You must output ONLY valid JSON that strictly conforms to this schema: {format_instructions}\n\n"
        "{user}"
    ),
    input_variables=["system", "user"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

chain = (
    {"system": RunnablePassthrough(), "user": RunnablePassthrough()} 
    | prompt 
    | model 
    | parser
)

def generate_quiz(url: str, title: str, content: str) -> Dict:
    payload = chain.invoke({
        "system": QUIZ_SYSTEM_PROMPT,
        "user": QUIZ_USER_PROMPT.format(title=title, url=url, content=content[:18000]),
    })
    payload["url"] = url
    payload["title"] = title
    return payload
