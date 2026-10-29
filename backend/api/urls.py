"""
api/urls.py
===========
API routing configuration.

Routers:
- `api/profiles/`
- `api/skills/`
- `api/services/`
- `api/experiences/`
- `api/projects/`
- `api/testimonials/`
- `api/messages/`

Custom Endpoints:
- `api/portfolio/`: Unified public data payload for the React frontend
- `api/contact/`: Contact message submission endpoint
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    get_portfolio_all_data, contact_submit, check_new_inquiries,
    admin_login_api, admin_status_api,
    ProfileViewSet, SkillViewSet, ServiceViewSet,
    ExperienceViewSet, ProjectViewSet, TestimonialViewSet, ContactMessageViewSet
)

# Initialize DRF DefaultRouter for standard REST operations
router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'messages', ContactMessageViewSet)

urlpatterns = [
    # Main endpoint serving all portfolio sections in a single fast call
    path('portfolio/', get_portfolio_all_data, name='portfolio-data'),
    
    # Form submission endpoint for visitors
    path('contact/', contact_submit, name='contact-submit'),
    
    # Real-time polling endpoint for sound and toast notifications in Django Admin
    path('poll-inquiries/', check_new_inquiries, name='poll-inquiries'),
    
    # Optional authentication endpoints
    path('auth/login/', admin_login_api, name='auth-login'),
    path('auth/status/', admin_status_api, name='auth-status'),
    
    # Include all ViewSet router endpoints
    path('', include(router.urls)),
]
