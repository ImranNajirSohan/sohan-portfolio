"""
api/serializers.py
==================
Django REST Framework ModelSerializers.

Serializers convert complex Django model instances into native Python datatypes
that can easily be rendered into JSON responses sent to the React frontend.
They also handle URL building for uploaded image and resume files.
"""

from rest_framework import serializers
from .models import (
    Profile, Skill, Service, Experience, 
    Project, Testimonial, ContactMessage, SiteSetting
)


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializes the master Profile model.
    Builds absolute URLs for uploaded avatar and resume files.
    """
    avatar_display_url = serializers.SerializerMethodField()
    resume_display_url = serializers.SerializerMethodField()
    roles_list = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_avatar_display_url(self, obj):
        request = self.context.get('request')
        if obj.avatar and hasattr(obj.avatar, 'name') and obj.avatar.name:
            try:
                if obj.avatar.storage.exists(obj.avatar.name):
                    if request:
                        return request.build_absolute_uri(obj.avatar.url)
                    return obj.avatar.url
            except Exception:
                pass
        return obj.avatar_url or ""

    def get_resume_display_url(self, obj):
        request = self.context.get('request')
        if obj.resume_file and hasattr(obj.resume_file, 'name') and obj.resume_file.name:
            try:
                if obj.resume_file.storage.exists(obj.resume_file.name):
                    if request:
                        return request.build_absolute_uri(obj.resume_file.url)
                    return obj.resume_file.url
            except Exception:
                pass
        return obj.resume_url or "#"

    def get_roles_list(self, obj):
        """
        Converts comma-separated roles into a clean Python list for React typewriter.
        """
        if not obj.typed_roles:
            return []
        return [r.strip() for r in obj.typed_roles.split(',') if r.strip()]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'

    def get_features_list(self, obj):
        """
        Converts newline-separated bullet points into a clean list of strings.
        """
        if not obj.features:
            return []
        return [f.strip() for f in obj.features.split('\n') if f.strip()]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    image_display_url = serializers.SerializerMethodField()
    tech_stack_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_image_display_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'name') and obj.image.name:
            try:
                if obj.image.storage.exists(obj.image.name):
                    if request:
                        return request.build_absolute_uri(obj.image.url)
                    return obj.image.url
            except Exception:
                pass
        return obj.image_url or ""

    def get_tech_stack_list(self, obj):
        """
        Splits comma-separated tech stacks into an array of tags (e.g. ['Django', 'Laravel', 'React']).
        """
        if not obj.tech_stack:
            return []
        return [t.strip() for t in obj.tech_stack.split(',') if t.strip()]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'
