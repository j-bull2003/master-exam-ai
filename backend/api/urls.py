from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssessmentViewSet, TestViewSet, DomainViewSet, SkillViewSet, ItemViewSet
from .auth_views import login_view, register_view, logout_view, me_view, csrf_token_view

router = DefaultRouter()
router.register(r"assessments", AssessmentViewSet, basename="assessment")
router.register(r"tests", TestViewSet, basename="test")
router.register(r"domains", DomainViewSet, basename="domain")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"items", ItemViewSet, basename="item")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/login/", login_view, name="login"),
    path("auth/register/", register_view, name="register"),
    path("auth/logout/", logout_view, name="logout"),
    path("auth/me/", me_view, name="me"),
    path("auth/csrf/", csrf_token_view, name="csrf"),
]
