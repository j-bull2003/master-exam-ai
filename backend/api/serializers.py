# api/serializers.py
from rest_framework import serializers
from .models import Assessment, Test, Domain, Skill, Item


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ("id", "text")


class TestSerializer(serializers.ModelSerializer):
    assessment = serializers.PrimaryKeyRelatedField(
        queryset=Assessment.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Test
        fields = ("id", "text", "assessment")


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "text")


class DomainSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(source="skills", many=True, read_only=True)

    class Meta:
        model = Domain
        fields = ("id", "text", "primary_class_cd", "test", "skills")


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("raw_id", "subject", "status", "source")
