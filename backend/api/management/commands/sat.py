from django.core.management.base import BaseCommand
from django.db import transaction
from urllib.parse import urlparse

from api.models import Source, Exam, Question, Choice
from api.scrapers import SatOnrenderScraper, BASE_CATEGORIES_URL


class Command(BaseCommand):
    help = "Scrape SAT questions from sat-questions.onrender.com only."

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=0, help="Max questions to import (0 = all).")
        parser.add_argument("--dry", action="store_true", help="Parse without writing to DB.")

    def handle(self, *args, **opts):
        limit = opts["limit"]
        dry = opts["dry"]

        parsed = urlparse(BASE_CATEGORIES_URL)
        domain = parsed.netloc
        source_name = domain
        exam_title = "SAT (sat-questions.onrender.com)"

        scraper = SatOnrenderScraper()

        if dry:
            self.stdout.write(self.style.WARNING("--dry enabled: no database writes."))

        source, _ = Source.objects.get_or_create(
            name=source_name, defaults={"base_url": f"{parsed.scheme}://{domain}"}
        )
        exam, _ = Exam.objects.get_or_create(title=exam_title, defaults={"source": source})

        created = 0
        seen = 0
        for i, url in enumerate(scraper.all_question_urls()):
            if limit and i >= limit:
                break
            seen += 1
            pq = scraper.parse_question(url)
            if not pq:
                self.stdout.write(f"Skipped: {url}")
                continue

            if dry:
                self.stdout.write(f"Parsed {pq.section} Q#{pq.number or '?'} – {pq.url}")
                continue

            with transaction.atomic():
                q, is_new = Question.objects.get_or_create(
                    source=source,
                    source_uid=pq.source_uid,
                    defaults=dict(
                        exam=exam,
                        section=pq.section,
                        qtype=pq.qtype,
                        number=pq.number,
                        text=pq.text or " ",
                        html=pq.html,
                        difficulty=pq.difficulty,
                        explanation=pq.explanation,
                        correct_answer=pq.correct_answer,
                        source_url=pq.url,
                    ),
                )
                if is_new:
                    created += 1
                    for order, ch in enumerate(pq.choices, start=1):
                        Choice.objects.create(
                            question=q,
                            label=ch.label,
                            text=ch.text,
                            html=ch.html,
                            is_correct=ch.is_correct,
                            order=order,
                        )
            self.stdout.write(self.style.SUCCESS(f"Imported: {url}"))

        self.stdout.write(self.style.SUCCESS(f"Done. Parsed {seen} pages, created {created} questions."))
