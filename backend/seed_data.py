import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import (
    Profile, Skill, Service, Experience,
    Project, Testimonial, SiteSetting
)

def seed():
    print("Creating default superuser...")
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "admin123")
        print("Superuser created: username='admin', password='admin123'")
    else:
        print("Superuser 'admin' already exists.")

    print("Seeding Site Setting...")
    SiteSetting.objects.update_or_create(
        id=1,
        defaults={
            "site_title": "Sohan | Full-Stack Engineer (Django & Laravel)",
            "hero_badge": "🔥 Open for Hire: Python Django & PHP Laravel Specialist",
            "cta_text": "Let's build your next Django or Laravel application!",
            "footer_text": "Built with Django & React | Expert in Django, Laravel, React & MySQL.",
            "theme_accent_primary": "#FF5E14",
            "theme_accent_secondary": "#FFB800"
        }
    )

    print("Seeding Profile...")
    Profile.objects.update_or_create(
        id=1,
        defaults={
            "name": "Sohanur Rahman Sohan",
            "tagline": "Full-Stack Software Engineer | Django & Laravel Specialist",
            "typed_roles": "Django & Python Specialist, Laravel & PHP Expert, React.js Frontend Engineer, Full-Stack System Architect",
            "short_bio": "Versatile Full-Stack Engineer with deep mastery in both Python/Django and PHP/Laravel ecosystems. I build scalable backend architectures, high-performance REST APIs, and modern React interfaces that drive business growth.",
            "full_bio": "Hello! I am Sohan, a software engineer with a proven track record across modern web development stacks. What sets me apart is my dual capability in both Python/Django and PHP/Laravel—enabling me to architect high-throughput microservices, design scalable relational databases (MySQL, PostgreSQL), and craft fluid, interactive user experiences with React.js and Tailwind CSS. Whether your project demands enterprise Python AI/data pipelines or robust Laravel SaaS architectures, I deliver clean, tested, and high-velocity solutions.",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            "resume_url": "https://github.com",
            "email": "sohan.dev@example.com",
            "phone": "+880 1712-345678",
            "location": "Dhaka, Bangladesh",
            "years_of_experience": 3,
            "completed_projects": 32,
            "satisfied_clients": 22,
            "github_url": "https://github.com",
            "linkedin_url": "https://linkedin.com",
            "twitter_url": "https://twitter.com",
            "facebook_url": "https://facebook.com",
            "is_available_for_hire": True,
            "hero_quote": "Bridging Python Django and PHP Laravel to build reliable, high-speed software that clients love."
        }
    )

    print("Seeding Skills...")
    Skill.objects.all().delete()
    skills_data = [
        {"name": "Python & Django", "category": "Backend", "proficiency": 95, "icon_name": "terminal", "is_featured": True, "order": 1},
        {"name": "PHP & Laravel", "category": "Backend", "proficiency": 93, "icon_name": "server", "is_featured": True, "order": 2},
        {"name": "RESTful APIs (DRF & Sanctum)", "category": "Backend", "proficiency": 95, "icon_name": "network", "is_featured": True, "order": 3},
        {"name": "Redis & Queue Workers", "category": "Backend", "proficiency": 84, "icon_name": "cpu", "is_featured": False, "order": 4},
        {"name": "React.js", "category": "Frontend", "proficiency": 90, "icon_name": "code", "is_featured": True, "order": 5},
        {"name": "JavaScript (ES6+)", "category": "Frontend", "proficiency": 92, "icon_name": "sparkles", "is_featured": True, "order": 6},
        {"name": "Tailwind CSS", "category": "Frontend", "proficiency": 95, "icon_name": "palette", "is_featured": True, "order": 7},
        {"name": "Blade & Modern HTML5", "category": "Frontend", "proficiency": 92, "icon_name": "layout", "is_featured": False, "order": 8},
        {"name": "MySQL (Schema & Query Tuning)", "category": "Database", "proficiency": 92, "icon_name": "database", "is_featured": True, "order": 9},
        {"name": "PostgreSQL", "category": "Database", "proficiency": 88, "icon_name": "database", "is_featured": False, "order": 10},
        {"name": "Git & GitHub", "category": "Tools & Others", "proficiency": 92, "icon_name": "git-branch", "is_featured": True, "order": 11},
        {"name": "Docker & VPS Deployment", "category": "DevOps & Cloud", "proficiency": 85, "icon_name": "box", "is_featured": True, "order": 12},
    ]
    for s in skills_data:
        Skill.objects.create(**s)

    print("Seeding Services...")
    Service.objects.all().delete()
    services_data = [
        {
            "title": "Python & Django Web Development",
            "short_description": "Production-grade backend systems built with Django REST Framework, ORM optimization, and enterprise-grade security.",
            "icon_name": "server",
            "features": "Django REST Framework APIs\nRobust Authentication & RBAC\nScalable Database & Caching",
            "order": 1
        },
        {
            "title": "PHP & Laravel SaaS Development",
            "short_description": "Custom Laravel web applications, multi-tenant SaaS architectures, Eloquent ORM tuning, and third-party API integrations.",
            "icon_name": "layers",
            "features": "Laravel Sanctum / Passport Auth\nPayment Gateways (Stripe, SSLCommerz)\nQueues, Events & Notification systems",
            "order": 2
        },
        {
            "title": "Modern React.js Frontend Engineering",
            "short_description": "Fluid, interactive user interfaces designed with React, Tailwind CSS, component modularity, and high Lighthouse speed scores.",
            "icon_name": "zap",
            "features": "Modern React hooks & state management\nResponsive mobile-first layouts\nSeamless REST & WebSocket integration",
            "order": 3
        },
        {
            "title": "MySQL Database Architecture & Optimization",
            "short_description": "Clean relational schema design, indexing, slow query analysis, and data migration pipelines for high-traffic platforms.",
            "icon_name": "database",
            "features": "Complex query profiling & indexing\nACID transactions & data integrity\nAutomated backup & replication setup",
            "order": 4
        }
    ]
    for serv in services_data:
        Service.objects.create(**serv)

    print("Seeding Projects...")
    Project.objects.all().delete()
    projects_data = [
        {
            "title": "Multi-Vendor E-Commerce Platform",
            "slug": "multi-vendor-ecommerce-laravel-react",
            "tagline": "Full-Featured E-Commerce Ecosystem with Laravel, React & MySQL",
            "description": "High-volume online marketplace featuring dynamic catalog filters, vendor dashboard, multi-step checkout with Stripe & SSLCommerz, and automated invoice generation.",
            "category": "Full Stack",
            "tech_stack": "PHP, Laravel, React, MySQL, Tailwind CSS, Redis",
            "image_url": "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80",
            "live_url": "https://example.com/demo-ecommerce",
            "github_url": "https://github.com",
            "is_featured": True,
            "order": 1
        },
        {
            "title": "Enterprise Cloud Project & Task Manager",
            "slug": "cloud-project-manager-django-react",
            "tagline": "Real-Time Collaboration Platform with Django REST, React & WebSockets",
            "description": "Team productivity suite with Kanban boards, role permissions, activity audit logs, time tracking, and instant WebSocket notifications for remote agile squads.",
            "category": "Full Stack",
            "tech_stack": "Python, Django, React, MySQL, WebSockets, Celery",
            "image_url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
            "live_url": "https://example.com/demo-tasks",
            "github_url": "https://github.com",
            "is_featured": True,
            "order": 2
        },
        {
            "title": "High-Throughput Authentication & RBAC Microservice",
            "slug": "auth-rbac-microservice",
            "tagline": "Enterprise Security Gateway in Django & Laravel Sanctum",
            "description": "Centralized authentication system supporting JWT, OAuth2, Two-Factor Authentication (TOTP), IP rate-limiting, and granular permission matrices.",
            "category": "Backend & API",
            "tech_stack": "Django REST, Laravel Sanctum, MySQL, Docker, Redis",
            "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
            "live_url": "https://example.com/demo-auth",
            "github_url": "https://github.com",
            "is_featured": True,
            "order": 3
        },
        {
            "title": "SaaS Financial Analytics & Revenue Dashboard",
            "slug": "saas-financial-dashboard",
            "tagline": "Predictive Business Metrics & Real-Time Reporting",
            "description": "Interactive data visualization dashboard processing business transactions into actionable KPI charts, exportable PDF reports, and automated revenue insights.",
            "category": "Frontend",
            "tech_stack": "React, Tailwind CSS, Django REST, Chart.js, MySQL",
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
            "live_url": "https://example.com/demo-analytics",
            "github_url": "https://github.com",
            "is_featured": True,
            "order": 4
        }
    ]
    for p in projects_data:
        Project.objects.create(**p)

    print("All initial data seeded successfully!")

if __name__ == '__main__':
    seed()
