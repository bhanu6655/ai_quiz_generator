from __future__ import annotations
import re
import requests
from bs4 import BeautifulSoup
from typing import Tuple

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

MAIN_SELECTOR = "#mw-content-text"
TITLE_SELECTOR = "#firstHeading"

CLEAN_TAGS = ["table", "style", "script", "noscript", "nav", "header", "footer"]

SUP_REF = "sup"

def scrape_wikipedia(url: str) -> Tuple[str, str]:
    resp = requests.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    title_el = soup.select_one(TITLE_SELECTOR)
    title = title_el.get_text(strip=True) if title_el else "Untitled"

    main = soup.select_one(MAIN_SELECTOR) or soup

    # Remove unwanted blocks
    for tag in main.find_all(CLEAN_TAGS):
        tag.decompose()

    # Remove references like [1]
    for sup in main.find_all(SUP_REF):
        sup.decompose()

    text_parts = []
    for p in main.find_all(["p", "li", "h2", "h3", "h4"]):
        t = p.get_text(" ", strip=True)
        if t:
            text_parts.append(re.sub(r"\s+", " ", t))

    clean_text = "\n".join(text_parts)
    return title, clean_text
