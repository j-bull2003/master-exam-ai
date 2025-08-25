import re
import time
import hashlib
from dataclasses import dataclass
from typing import Iterable, Optional, List
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup


BASE_CATEGORIES_URL = "https://sat-questions.onrender.com/categories"


@dataclass
class ParsedChoice:
    label: str
    text: str
    html: str
    is_correct: bool


@dataclass
class ParsedQuestion:
    source_uid: str
    url: str
    section: str
    qtype: str
    number: Optional[int]
    text: str
    html: str
    explanation: str
    difficulty: str
    correct_answer: str
    choices: List[ParsedChoice]
    keys: List[str]


class SatOnrenderScraper:
    """Scraper that ONLY targets https://sat-questions.onrender.com/categories"""

    delay_sec: float = 0.4
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; SATScraper/1.0; +https://example.com)"
    }

    def fetch(self, url: str) -> BeautifulSoup:
        time.sleep(self.delay_sec)
        r = requests.get(url, headers=self.headers, timeout=30)
        r.raise_for_status()
        return BeautifulSoup(r.text, "lxml")

    # ---- Discover: categories -> first question in that category ----
    def category_first_questions(self) -> Iterable[str]:
        """Yield URLs of the first question for each category tile."""
        soup = self.fetch(BASE_CATEGORIES_URL)
        # The categories page is mostly links – many point directly to /question/<filters>/<id>
        for a in soup.select("a[href]"):
            href = a.get("href", "")
            if "/question/" in href:
                yield urljoin(BASE_CATEGORIES_URL, href)

    # ---- Crawl a category sequence via the "Next" control ----
    def walk_category(self, first_question_url: str) -> Iterable[str]:
        """Follow 'Next' links within a category until it stops."""
        seen = set()
        url = first_question_url
        while url and url not in seen:
            seen.add(url)
            yield url
            soup = self.fetch(url)
            # Look for a link whose text contains 'Next'
            nxt = None
            for a in soup.select("a[href]"):
                if a.get_text(strip=True).lower() == "next":
                    nxt = urljoin(url, a["href"])
                    break
            if not nxt or nxt in seen:
                break
            url = nxt

    # ---- Parse a single question page ----
    def parse_question(self, url: str) -> Optional[ParsedQuestion]:
        soup = self.fetch(url)
        body_text = soup.get_text("\n", strip=True)

        # Correct letter (A–D)
        m_ans = re.search(r"Correct\s*Answer:\s*([A-D])", body_text, flags=re.I)
        correct_letter = m_ans.group(1).upper() if m_ans else ""

        # Split stem vs choices (1. 2. 3. 4.)
        parts = re.split(r"\n\s*1\.\s*", body_text, maxsplit=1)
        stem_text = (parts[0].strip() if parts else "")
        choices_block = parts[1] if len(parts) > 1 else ""
        options = re.findall(r"(?:^|\n)\s*([1-4])\.\s*(.+?)(?=\n\s*[1-4]\.\s*|$)", choices_block, flags=re.S)

        labels = ["A", "B", "C", "D"]
        parsed_choices: List[ParsedChoice] = []
        for idx_str, txt in options:
            i = int(idx_str) - 1
            label = labels[i] if 0 <= i < 4 else ""
            clean = re.sub(r"\s+", " ", txt).strip()
            parsed_choices.append(ParsedChoice(label=label, text=clean, html="", is_correct=(label == correct_letter)))

        # Rationale (HTML on site often becomes text here)
        exp = ""
        m_rat = re.search(r"Rationale\s*(.+)$", body_text, flags=re.S | re.I)
        if m_rat:
            exp = re.sub(r"\s+", " ", m_rat.group(1)).strip()

        keys: List[str] = []
        for ch in parsed_choices:
            if ch.is_correct and ch.text:
                keys.append(ch.text)
        variants = set()
        rat_block = m_rat.group(1) if m_rat else ""
        for m in re.finditer(r"(?<![\d/])(?:\d+/\d+|\d*\.\d+|\.\d+)(?![\d/])", rat_block):
            variants.add(m.group(0).strip())
        keys.extend(sorted(variants))

        keys = list(dict.fromkeys([k.strip() for k in keys if k.strip()]))

        raw = body_text.lower()
        section = "READ" if "reading and writing" in raw or "standard english" in raw else ("MC" if "math" in raw else "OTH")
        difficulty = "UNK"
        m_num = re.search(r"(\d+)\s*/\s*\d+", body_text)
        qnum = int(m_num.group(1)) if m_num else None

        uid = hashlib.sha256(url.encode("utf-8")).hexdigest()[:16]
        return ParsedQuestion(
            source_uid=uid,
            url=url,
            section=section,
            qtype="MCQ",
            number=qnum,
            text=stem_text,
            html="",
            explanation=exp,
            difficulty=difficulty,
            correct_answer=correct_letter,
            choices=parsed_choices,
            keys=keys,
        )

    # ---- Master iterator over all category questions ----
    def all_question_urls(self) -> Iterable[str]:
        for first in self.category_first_questions():
            yield from self.walk_category(first)
