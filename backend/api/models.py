"""
api/models.py
=============
Database Models for Sohan's Portfolio.

This file defines the relational database tables managed by Django's ORM:
1. Profile: Personal information, typewriter animated roles, bio, social links, resume.
2. Skill: Tech competencies with categories and proficiency percentages (1-100%).
3. Service: Solutions offered with bulleted feature lists.
4. Experience: Career history and education timeline entries.
5. Project: Case studies and projects with tech stacks, images, and live links.
6. Testimonial: Client reviews and ratings.
7. ContactMessage: Visitor messages submitted from the React contact form.
8. SiteSetting: Global visual settings and theme badges.
"""

from django.db import models
from django.utils.text import slugify
import io
import base64
from PIL import Image


def convert_uploaded_image_to_base64(file_obj, max_size=(800, 800)):
    """
    Safely converts an uploaded image into a high-quality compressed Base64 Data URL.
    This guarantees 100% permanence in MySQL across serverless (Vercel) instances without needing S3.
    """
    try:
        file_obj.seek(0)
        img = Image.open(file_obj)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85, optimize=True)
        b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')
        return f"data:image/jpeg;base64,{b64_str}"
    except Exception as e:
        print("Image base64 conversion note:", e)
        return None


class Profile(models.Model):
    """
    Stores Sohan's master profile details.
    Only 1 main profile record is used across the portfolio.
    """
    name = models.CharField(max_length=150, default="Sohanur Rahman Sohan")
    tagline = models.CharField(max_length=250, default="Full-Stack Software Engineer | Django & Laravel Specialist")
    typed_roles = models.TextField(
        default="Django & Python Specialist, Laravel & PHP Expert, React.js Frontend Engineer, Full-Stack System Architect",
        help_text="Comma-separated roles for animated typing effect"
    )
    short_bio = models.TextField(
        default="Versatile Full-Stack Engineer with deep mastery in both Python/Django and PHP/Laravel ecosystems. I build scalable backend architectures, high-performance REST APIs, and modern React interfaces that drive business growth."
    )
    full_bio = models.TextField(
        blank=True,
        default="Hello! I am Sohan, a software engineer with a proven track record across modern web development stacks. What sets me apart is my dual capability in both Python/Django and PHP/Laravel—enabling me to architect high-throughput microservices, design scalable relational databases (MySQL, PostgreSQL), and craft fluid, interactive user experiences with React.js and Tailwind CSS."
    )
    avatar = models.ImageField(upload_to='profile/', blank=True, null=True, help_text="Upload your personal photo (auto-saved to cloud database)")
    avatar_url = models.TextField(
        blank=True,
        default="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        help_text="Direct image URL or auto-generated photo data"
    )
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True, help_text="Upload your Resume/CV PDF")
    resume_url = models.TextField(blank=True, default="#", help_text="External link to resume or PDF data")
    email = models.EmailField(default="sohan.dev@example.com")
    phone = models.CharField(max_length=50, default="+880 1712-345678")
    location = models.CharField(max_length=150, default="Dhaka, Bangladesh")
    years_of_experience = models.PositiveIntegerField(default=3)
    completed_projects = models.PositiveIntegerField(default=32)
    satisfied_clients = models.PositiveIntegerField(default=22)
    github_url = models.URLField(default="https://github.com")
    linkedin_url = models.URLField(default="https://linkedin.com")
    twitter_url = models.URLField(blank=True, default="https://twitter.com")
    facebook_url = models.URLField(blank=True, default="https://facebook.com")
    is_available_for_hire = models.BooleanField(default=True)
    hero_quote = models.CharField(
        max_length=255,
        default="Bridging Python Django and PHP Laravel to build reliable, high-speed software that clients love."
    )

    class Meta:
        verbose_name = "Personal Profile"
        verbose_name_plural = "Personal Profile"

    def save(self, *args, **kwargs):
        # Auto-convert uploaded avatar to permanent Base64 Data URL in database
        if self.avatar and hasattr(self.avatar, 'file'):
            data_url = convert_uploaded_image_to_base64(self.avatar.file, max_size=(800, 800))
            if data_url:
                self.avatar_url = data_url
                self.avatar = None

        # Auto-convert uploaded resume PDF to Base64 Data URL in database
        if self.resume_file and hasattr(self.resume_file, 'file'):
            try:
                self.resume_file.file.seek(0)
                pdf_bytes = self.resume_file.file.read()
                if pdf_bytes and len(pdf_bytes) < 8 * 1024 * 1024:
                    b64_pdf = base64.b64encode(pdf_bytes).decode('utf-8')
                    self.resume_url = f"data:application/pdf;base64,{b64_pdf}"
                    self.resume_file = None
            except Exception as e:
                print("Resume conversion note:", e)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Skill(models.Model):
    """
    Represents an individual technical competency.
    Proficiency is an integer from 1 to 100 for the progress bar.
    """
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Database', 'Database'),
        ('DevOps & Cloud', 'DevOps & Cloud'),
        ('Tools & Others', 'Tools & Others'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Backend')
    proficiency = models.PositiveIntegerField(default=90, help_text="Percentage (1-100)")
    icon_name = models.CharField(
        max_length=50,
        default="code",
        help_text="Lucide icon identifier (e.g. terminal, server, database, code, palette, zap)"
    )
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"


class Service(models.Model):
    """
    Professional services offered to clients and employers.
    Features are stored as newline-separated bullet points.
    """
    title = models.CharField(max_length=150)
    short_description = models.TextField()
    icon_name = models.CharField(max_length=50, default="zap")
    features = models.TextField(
        help_text="Newline separated bullet points for key features",
        default="Custom API Architecture\nSecure Authentication & RBAC\nScalable Database Design"
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Experience(models.Model):
    """
    Timeline item: Work experience or Education history.
    """
    TYPE_CHOICES = [
        ('experience', 'Work Experience'),
        ('education', 'Education'),
    ]

    company_or_institution = models.CharField(max_length=150)
    role_or_degree = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=TYPE_CHOICES, default='experience')
    start_date = models.CharField(max_length=50, help_text="e.g. 2023 or Jan 2023")
    end_date = models.CharField(max_length=50, default="Present", help_text="e.g. Present or Dec 2024")
    is_current = models.BooleanField(default=False)
    location = models.CharField(max_length=100, default="Dhaka, Bangladesh")
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.role_or_degree} at {self.company_or_institution}"


class Project(models.Model):
    """
    Portfolio project case study.
    Slug is automatically generated from the title upon saving.
    """
    CATEGORY_CHOICES = [
        ('Full Stack', 'Full Stack'),
        ('Backend & API', 'Backend & API'),
        ('Frontend', 'Frontend'),
        ('Cloud & DevOps', 'Cloud & DevOps'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    tagline = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Full Stack')
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated: PHP, Laravel, Python, Django, MySQL, React")
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Upload project screenshot (auto-saved to cloud database)")
    image_url = models.TextField(
        blank=True,
        default="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
        help_text="Preview image URL or auto-generated photo data"
    )
    live_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        # Auto-convert uploaded project screenshot to permanent Base64 Data URL in database
        if self.image and hasattr(self.image, 'file'):
            data_url = convert_uploaded_image_to_base64(self.image.file, max_size=(1200, 800))
            if data_url:
                self.image_url = data_url
                self.image = None

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """
    Client recommendations and feedback with 1-5 star ratings.
    """
    client_name = models.CharField(max_length=150)
    client_role = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    feedback = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    avatar_url = models.URLField(
        blank=True,
        default="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.client_name} ({self.rating}★)"


class ContactMessage(models.Model):
    """
    Stores inquiries sent by visitors via the React frontend contact form.
    Messages are managed and reviewed inside the Django Admin panel.
    """
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    admin_notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"


class SiteSetting(models.Model):
    """
    Global visual configurations and theme text.
    """
    site_title = models.CharField(max_length=150, default="Sohan | Full-Stack Engineer (Django & Laravel)")
    hero_badge = models.CharField(max_length=100, default="🔥 Open for Hire: Python Django & PHP Laravel Specialist")
    cta_text = models.CharField(max_length=100, default="Let's build your next Django or Laravel application!")
    footer_text = models.CharField(
        max_length=255,
        default="Built with Django & React | Expert in Django, Laravel, React & MySQL."
    )
    theme_accent_primary = models.CharField(max_length=20, default="#FF5E14")
    theme_accent_secondary = models.CharField(max_length=20, default="#FFB800")

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_title
