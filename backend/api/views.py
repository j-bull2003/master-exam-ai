# api/views.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Assessment, Test, Domain, Skill, Item
from .serializers import (
    AssessmentSerializer,
    TestSerializer,
    DomainSerializer,
    SkillSerializer,
    ItemSerializer,
)

class AssessmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Assessment.objects.all().order_by("name")
    serializer_class = AssessmentSerializer


class TestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Test.objects.all().order_by("name")
    serializer_class = TestSerializer


class DomainViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Domain.objects.all().order_by("code")
    serializer_class = DomainSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all().order_by("code")
    serializer_class = SkillSerializer


class ItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all().order_by("create_date")
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["stem", "question_id", "primary_class_desc"]
    ordering_fields = ["create_date", "update_date", "difficulty"]

    def get_queryset(self):
        qs = super().get_queryset()
        p = self.request.query_params

        # Hide items with no answer options by default
        require_options = p.get("require_options", "1")
        if require_options in ("1", "true", "True"):
            qs = qs.exclude(answer_options__isnull=True).exclude(answer_options=[])

        # Parse ints safely
        def to_int(val):
            try:
                return int(val)
            except (TypeError, ValueError):
                return None

        assessment = to_int(p.get("assessment"))
        test = to_int(p.get("test"))
        domain = to_int(p.get("domain"))
        skill = to_int(p.get("skill"))
        module = p.get("module")
        difficulty = p.get("difficulty")

        if assessment:
            qs = qs.filter(assessment_id=assessment)
        if test:
            qs = qs.filter(test_id=test)
        if domain:
            qs = qs.filter(domain_id=domain)
        if skill:
            qs = qs.filter(skill_id=skill)
        if module:
            qs = qs.filter(module__iexact=module)
        if difficulty:
            qs = qs.filter(difficulty__iexact=difficulty)

        return qs

    @action(detail=False, methods=["get"])
    def modules(self, request):
        """
        Return distinct, non-empty module names (case-insensitive unique, trimmed).
        If you want this list to respect current filters, use self.get_queryset()
        instead of Item.objects.all().
        """
        qs = Item.objects.all().exclude(module__isnull=True).exclude(module__exact="")
        seen_lower = set()
        out = []
        for m in qs.values_list("module", flat=True):
            s = (m or "").strip()
            key = s.lower()
            if s and key not in seen_lower:
                seen_lower.add(key)
                out.append(s)
        out.sort(key=str.lower)
        return Response(out)
