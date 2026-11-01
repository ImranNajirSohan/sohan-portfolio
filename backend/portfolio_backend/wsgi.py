"""
WSGI config for portfolio_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

application = get_wsgi_application()

# Auto-apply database migrations & seed initial portfolio data ONLY if database is empty
try:
    from django.core.management import call_command
    call_command('migrate', interactive=False)
    
    from api.models import Profile
    if not Profile.objects.exists():
        from seed_data import seed
        seed()
except Exception as err:
    print(f"Startup task notification: {err}")

# Expose app for Vercel Serverless Function
app = application
