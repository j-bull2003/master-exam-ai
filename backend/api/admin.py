from django.contrib import admin
from .models import Assessment, Test, Domain, Skill, Item  # keep only models that exist

@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "name")
    list_filter = ("code",)
    search_fields = ("code", "name")

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "name", "domain")
    list_filter = ("domain", "code")
    search_fields = ("code", "name")

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("uid", "program", "module", "difficulty", "primary_class_cd", "skill")
    list_filter = ("program", "module", "difficulty", "primary_class_cd")
    search_fields = ("question_id", "uid")
