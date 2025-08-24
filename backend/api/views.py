# api/views.py
from rest_framework import viewsets, mixins
from .models import Assessment, Test, Domain, Skill, Item
from .serializers import (
    AssessmentSerializer,
    TestSerializer,
    DomainSerializer,
    SkillSerializer,
    ItemSerializer,
)


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all().order_by("id")
    serializer_class = AssessmentSerializer


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.select_related("assessment").all().order_by("id")
    serializer_class = TestSerializer


class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.select_related("test").prefetch_related("skills").all().order_by("test__id", "id")
    serializer_class = DomainSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.select_related("domain", "domain__test").all().order_by("domain__id", "id")
    serializer_class = SkillSerializer


class ItemViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    Items are 'stub' rows keyed by UUID; typically read-only.
    """
    queryset = Item.objects.all().order_by("subject", "raw_id")
    serializer_class = ItemSerializer
    lookup_field = "raw_id"
