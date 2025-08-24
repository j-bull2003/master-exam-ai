import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from api.models import Assessment, Test, Domain, Skill, Item


class Command(BaseCommand):
    help = "Import SAT/PSAT items from a JSON file into SQLite."

    def add_arguments(self, parser):
        parser.add_argument("json_path", type=str, help="Path to the JSON file")

    def handle(self, *args, **options):
        json_path = Path(options["json_path"])
        if not json_path.exists():
            raise CommandError(f"File not found: {json_path}")

        with json_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        if not isinstance(data, dict):
            raise CommandError("Expected top-level JSON object keyed by UID.")

        created, updated = 0, 0

        for uid, payload in data.items():
            # top-level metadata
            program = payload.get("program") or "SAT"
            module_raw = (payload.get("module") or "").lower()
            difficulty = payload.get("difficulty")
            primary_class_cd = payload.get("primary_class_cd")
            primary_class_cd_desc = payload.get("primary_class_cd_desc")
            skill_cd = payload.get("skill_cd")
            skill_desc = payload.get("skill_desc")
            question_id = payload.get("questionId") or payload.get("question_id")
            external_id = payload.get("external_id")
            score_band_range_cd = payload.get("score_band_range_cd")
            ibn = payload.get("ibn")

            content = payload.get("content") or {}

            # Normalize subfields
            stem = content.get("stem") or content.get("prompt") or content.get("question") or ""
            rationale = content.get("rationale") or (content.get("answer") or {}).get("rationale") or ""
            correct_answers = (
                content.get("correct_answer")
                or (content.get("answer") or {}).get("correct_choice")
                or content.get("keys")
                or []
            )
            # normalize to list
            if isinstance(correct_answers, str):
                correct_answers = [correct_answers]

            # Friendly test name
            test_name = {
                "math": "Math",
                "reading": "Reading and Writing",
                "reading and writing": "Reading and Writing",
            }.get(module_raw, module_raw or "Unknown")

            # Upsert related models
            assess, _ = Assessment.objects.get_or_create(name=program)
            test, _ = Test.objects.get_or_create(name=test_name)

            domain = None
            if primary_class_cd or primary_class_cd_desc:
                domain, _ = Domain.objects.get_or_create(
                    code=primary_class_cd or "",
                    defaults={"name": primary_class_cd_desc or primary_class_cd or ""},
                )
                # update name if we later learned it
                if primary_class_cd_desc and (domain.name != primary_class_cd_desc):
                    domain.name = primary_class_cd_desc
                    domain.save(update_fields=["name"])

            skill = None
            if (skill_cd or skill_desc) and domain:
                skill, _ = Skill.objects.get_or_create(
                    code=skill_cd or "",
                    domain=domain,
                    defaults={"name": skill_desc or skill_cd or ""},
                )
                if skill_desc and (skill.name != skill_desc):
                    skill.name = skill_desc
                    skill.save(update_fields=["name"])

            # Keep only the leftover odds-and-ends in `content`
            # Remove what we now store in first-class fields
            content_slim = dict(content)
            for k in ["stem", "prompt", "question", "rationale", "answer", "correct_answer", "keys"]:
                content_slim.pop(k, None)

            # Keep some extras that don't have their own columns (but are useful)
            extras = {
                "ibn": ibn,
                "templateid": content.get("templateid"),
                "vaultid": content.get("vaultid"),
                "type": content.get("type"),
                "answerOptions": content.get("answerOptions"),
                "section": (content.get("section") or "").strip() or None,
                "origin": content.get("origin"),
                "externalid": content.get("externalid"),
            }
            for k, v in list(extras.items()):
                if v in (None, "", []):
                    extras.pop(k, None)
            content_slim.update(extras)

            # Build defaults using concrete Item fields
            defaults = {
                "question_id": question_id,
                "program": program,
                "module": test_name,
                "difficulty": difficulty,
                "primary_class_cd": primary_class_cd,
                "score_band_range_cd": score_band_range_cd,
                "external_id": external_id,
                "stem": stem or "",
                "rationale": rationale or "",
                "correct_answers": correct_answers,
                "content": content_slim,
                "assessment": assess,
                "test": test,
                "skill": skill,
            }

            # Upsert by uid (assumes Item has a `uid` field)
            obj, was_created = Item.objects.update_or_create(uid=uid, defaults=defaults)
            created += 1 if was_created else 0
            updated += 0 if was_created else 1

        self.stdout.write(self.style.SUCCESS(f"Import complete: {created} created, {updated} updated."))
