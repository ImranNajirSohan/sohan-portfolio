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
    
    from api.models import Profile, Skill, Service
    if not Profile.objects.exists():
        from seed_data import seed
        seed()
    else:
        # Ensure React Native is present in Skills
        if not Skill.objects.filter(name__icontains="React Native").exists():
            Skill.objects.create(
                name="React Native (iOS & Android)",
                category="Frontend",
                proficiency=90,
                icon_name="smartphone",
                is_featured=True,
                order=5
            )
        # Ensure React Native Mobile Development is present in Services
        if not Service.objects.filter(title__icontains="React Native").exists():
            Service.objects.create(
                title="Cross-Platform Mobile App Development (React Native)",
                short_description="Native-grade iOS & Android applications engineered with React Native, high-velocity UX, push notifications, and offline state synchronization.",
                icon_name="smartphone",
                features="React Native iOS & Android Apps\nClean Architecture & Global State\nPush Notifications & REST/GraphQL API Sync",
                is_active=True,
                order=5
            )
except Exception as err:
    print(f"Startup task notification: {err}")

# Expose app for Vercel Serverless Function
app = application
