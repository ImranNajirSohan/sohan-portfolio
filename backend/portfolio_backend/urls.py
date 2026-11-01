"""
URL configuration for portfolio_backend project.

Routes:
- `/admin/`: Django Admin Portal
- `/api/`: REST API endpoints for the React frontend
- `/media/`: Uploaded media files (avatars, screenshots, resumes)
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

# Customize Django Admin Header and Title
admin.site.site_header = "Sohan Portfolio Administration"
admin.site.site_title = "Sohan Portfolio Admin Portal"
admin.site.index_title = "Portfolio Content & System Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
