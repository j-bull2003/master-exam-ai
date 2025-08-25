from rest_framework import serializers
from .models import Assessment, Test, Domain, Skill, Item

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = "__all__"

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            "uid", "question_id", "program", "module", "difficulty",
            "primary_class_cd", "primary_class_desc", "score_band_range_cd",
            "assessment", "test", "domain", "skill",
            "stem", "rationale", "external_id",
            "correct_answers", "answer_options", "update_date", "create_date",
            "content",
        ]
    