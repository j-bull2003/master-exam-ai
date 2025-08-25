from django.db import models

class Assessment(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Test(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Domain(models.Model):
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=100)

class Skill(models.Model):
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=150)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name="skills")

class Item(models.Model):
    uid = models.UUIDField(primary_key=True)
    question_id = models.CharField(max_length=20, blank=True, null=True)
    program = models.CharField(max_length=20)
    module = models.CharField(max_length=20)
    difficulty = models.CharField(max_length=5, blank=True, null=True)
    primary_class_cd = models.CharField(max_length=5, blank=True, null=True)
    primary_class_desc = models.CharField(max_length=100, blank=True, null=True)
    score_band_range_cd = models.IntegerField(blank=True, null=True)

    assessment = models.ForeignKey(Assessment, on_delete=models.SET_NULL, null=True, blank=True)
    test = models.ForeignKey(Test, on_delete=models.SET_NULL, null=True, blank=True)
    domain = models.ForeignKey(Domain, on_delete=models.SET_NULL, null=True, blank=True)
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True)

    stem = models.TextField(blank=True, default="")
    rationale = models.TextField(blank=True, default="")
    answer_options = models.JSONField(default=list, blank=True)
    correct_answers = models.JSONField(default=list, blank=True)   # <- letters (A/B/..), or fallback to keys
    content = models.JSONField(default=dict, blank=True)           # <- OPTIONAL: keep extra scraped fields

    external_id = models.CharField(max_length=120, blank=True, null=True)
    update_date = models.BigIntegerField(blank=True, null=True)
    create_date = models.BigIntegerField(blank=True, null=True)
