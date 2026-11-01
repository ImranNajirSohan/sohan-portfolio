"""
api/admin.py
============
Django Administration Dashboard Configuration.

This file registers and customizes the administrative portal for:
- Profile (with thumbnail photo preview)
- Skills (with category filtering and inline proficiency editing)
- Services (active toggles and ordering)
- Experience & Education (categorized timeline management)
- Projects (thumbnail previews, slug auto-generation, filtering)
- Testimonials (star ratings and ordering)
- Contact Messages (read/unread toggles and read-only visitor info)
- Site Settings (global headline and theme settings)
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Profile, Skill, Service, Experience,
    Project, Testimonial, ContactMessage, SiteSetting
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'tagline', 'email', 'phone', 'is_available_for_hire', 'avatar_preview')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'tagline', 'typed_roles', 'is_available_for_hire', 'hero_quote')
        }),
        ('Biographies', {
            'fields': ('short_bio', 'full_bio')
        }),
        ('Visual Assets & Resume', {
            'fields': ('avatar', 'avatar_url', 'resume_file', 'resume_url')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'location')
        }),
        ('Achievements & Counters', {
            'fields': ('years_of_experience', 'completed_projects', 'satisfied_clients')
        }),
        ('Social Links', {
            'fields': ('github_url', 'linkedin_url', 'twitter_url', 'facebook_url')
        }),
    )

    def avatar_preview(self, obj):
        try:
            url = obj.avatar.url if (obj.avatar and hasattr(obj.avatar, 'url')) else obj.avatar_url
        except Exception:
            url = obj.avatar_url
        if url:
            return format_html('<img src="{}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />', url)
        return "No Avatar"
    avatar_preview.short_description = "Avatar"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'icon_name', 'is_featured', 'order')
    list_filter = ('category', 'is_featured')
    search_fields = ('name',)
    list_editable = ('proficiency', 'order', 'is_featured')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('title', 'short_description')
    list_editable = ('is_active', 'order')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role_or_degree', 'company_or_institution', 'category', 'start_date', 'end_date', 'is_current', 'order')
    list_filter = ('category', 'is_current')
    search_fields = ('role_or_degree', 'company_or_institution', 'description')
    list_editable = ('order',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'tech_stack', 'is_featured', 'order', 'project_thumbnail')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'tagline', 'tech_stack', 'description')
    list_editable = ('is_featured', 'order')
    prepopulated_fields = {'slug': ('title',)}

    def project_thumbnail(self, obj):
        try:
            url = obj.image.url if (obj.image and hasattr(obj.image, 'url')) else obj.image_url
        except Exception:
            url = obj.image_url
        if url:
            return format_html('<img src="{}" style="width: 60px; height: 35px; border-radius: 4px; object-fit: cover;" />', url)
        return "No Image"
    project_thumbnail.short_description = "Thumbnail"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'company', 'rating', 'is_active', 'order')
    list_filter = ('rating', 'is_active')
    search_fields = ('client_name', 'company', 'feedback')
    list_editable = ('is_active', 'order')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read', 'is_replied')
    list_filter = ('is_read', 'is_replied', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_editable = ('is_read', 'is_replied')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('site_title', 'hero_badge', 'theme_accent_primary', 'theme_accent_secondary')
