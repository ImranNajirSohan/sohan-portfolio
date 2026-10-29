"""
URL configuration for portfolio_backend project.

Routes:
- `/admin/`: Django Admin Portal
- `/api/`: REST API endpoints for the React frontend
- `/media/`: Uploaded media files (avatars, screenshots, resumes) in DEBUG mode
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Customize Django Admin Header and Title
admin.site.site_header = "Sohan Portfolio Administration"
admin.site.site_title = "Sohan Portfolio Admin Portal"
admin.site.index_title = "Portfolio Content & System Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Serve media and static files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
