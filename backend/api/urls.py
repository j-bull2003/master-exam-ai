from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssessmentViewSet, TestViewSet, DomainViewSet, SkillViewSet, ItemViewSet

router = DefaultRouter()
router.register(r"assessments", AssessmentViewSet, basename="assessment")
router.register(r"tests", TestViewSet, basename="test")
router.register(r"domains", DomainViewSet, basename="domain")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"items", ItemViewSet, basename="item")

urlpatterns = [
    path("", include(router.urls)),
]
