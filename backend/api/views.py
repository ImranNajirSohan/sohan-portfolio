"""
api/views.py
============
Django REST Framework (DRF) API Views.

Endpoints:
1. `GET /api/portfolio/`:
   Unified endpoint returning all public portfolio sections (profile, skills,
   services, experiences, projects, testimonials, settings) in a single fast call.

2. `POST /api/contact/`:
   Receives and validates message submissions from visitors on the React frontend.
   Saves each message into MySQL for review in Django Admin.

3. ModelViewSets for RESTful CRUD operations (Profile, Skill, Service, etc.).
"""

from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

from .models import (
    Profile, Skill, Service, Experience, 
    Project, Testimonial, ContactMessage, SiteSetting
)
from .serializers import (
    ProfileSerializer, SkillSerializer, ServiceSerializer, ExperienceSerializer,
    ProjectSerializer, TestimonialSerializer, ContactMessageSerializer, SiteSettingSerializer
)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_portfolio_all_data(request):
    """
    Main endpoint consumed by the React frontend on initial page load.
    Delivers all dynamic portfolio data in a single optimized JSON payload.
    """
    # Always fetch the latest updated profile and site settings
    profile = Profile.objects.order_by('-id').first()
    settings_obj = SiteSetting.objects.order_by('-id').first()

    profile_data = ProfileSerializer(profile, context={'request': request}).data if profile else None
    settings_data = SiteSettingSerializer(settings_obj, context={'request': request}).data if settings_obj else None

    skills = Skill.objects.all()
    services = Service.objects.filter(is_active=True)
    experiences = Experience.objects.all()
    projects = Project.objects.all()
    testimonials = Testimonial.objects.filter(is_active=True)

    return Response({
        'profile': profile_data,
        'settings': settings_data,
        'skills': SkillSerializer(skills, many=True, context={'request': request}).data,
        'services': ServiceSerializer(services, many=True, context={'request': request}).data,
        'experiences': ExperienceSerializer(experiences, many=True, context={'request': request}).data,
        'projects': ProjectSerializer(projects, many=True, context={'request': request}).data,
        'testimonials': TestimonialSerializer(testimonials, many=True, context={'request': request}).data,
    })


import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def contact_submit(request):
    """
    Handles visitor contact form submissions from React.
    Validates name, email, subject, message, saves into the MySQL database,
    and dispatches an email notification to sohanuddin404@gmail.com.
    """
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        instance = serializer.save()

        # Send instant email notification to Sohan's inbox
        recipient = getattr(settings, 'NOTIFICATION_RECIPIENT_EMAIL', 'sohanuddin404@gmail.com')
        email_subject = f"📬 New Portfolio Inquiry from {instance.name}: {instance.subject}"
        phone_num = request.data.get('phone', 'Not provided')
        email_body = (
            f"Hello Sohan,\n\n"
            f"A client or visitor has sent you a new message through your portfolio website!\n\n"
            f"👤 Client Name: {instance.name}\n"
            f"📧 Client Email: {instance.email}\n"
            f"📱 Phone: {phone_num}\n"
            f"📝 Subject: {instance.subject}\n\n"
            f"💬 Message Content:\n"
            f"--------------------------------------------------\n"
            f"{instance.message}\n"
            f"--------------------------------------------------\n\n"
            f"📅 Date & Time: {instance.created_at.strftime('%Y-%m-%d %I:%M %p')}\n"
            f"⚡ Review in Admin Panel: http://127.0.0.1:8000/admin/api/contactmessage/{instance.id}/change/\n"
        )
        try:
            send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=True,
            )
        except Exception as e:
            logger.warning(f"Email dispatch error: {e}")

        return Response({
            'success': True,
            'message': 'Thank you! Your message has been sent successfully.'
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_new_inquiries(request):
    """
    Real-time polling endpoint for the Django Admin interface.
    Checks for new incoming messages and unread counts so the admin panel
    can trigger a sound chime and visual toast notification immediately.
    """
    last_id = request.GET.get('last_id', 0)
    try:
        last_id = int(last_id)
    except (ValueError, TypeError):
        last_id = 0

    unread_count = ContactMessage.objects.filter(is_read=False).count()
    latest_msg = ContactMessage.objects.order_by('-id').first()

    has_new = False
    latest_data = None

    if latest_msg and latest_msg.id > last_id:
        has_new = True
        preview_text = latest_msg.message[:100] + ('...' if len(latest_msg.message) > 100 else '')
        latest_data = {
            'id': latest_msg.id,
            'name': latest_msg.name,
            'email': latest_msg.email,
            'subject': latest_msg.subject,
            'message': preview_text,
            'created_at': latest_msg.created_at.strftime('%I:%M %p'),
            'admin_url': f'/admin/api/contactmessage/{latest_msg.id}/change/'
        }

    return Response({
        'has_new': has_new,
        'unread_count': unread_count,
        'latest_id': latest_msg.id if latest_msg else 0,
        'latest': latest_data
    })


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login_api(request):
    """
    Optional API endpoint for checking staff credentials.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if user is not None and user.is_staff:
        login(request, user)
        return Response({
            'authenticated': True,
            'username': user.username,
            'is_staff': user.is_staff,
            'message': 'Login successful.'
        })
    return Response({'authenticated': False, 'detail': 'Invalid credentials or unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([AllowAny])
def admin_status_api(request):
    """
    Check if the current session belongs to an authenticated staff/admin user.
    """
    if request.user.is_authenticated and request.user.is_staff:
        return Response({
            'authenticated': True,
            'username': request.user.username,
            'is_staff': True
        })
    return Response({'authenticated': False})


# ============================================================================
# Standard REST ModelViewSets (Providing full CRUD endpoints if needed)
# ============================================================================

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    Viewset for contact messages.
    - Anyone can create (submit form)
    - Only logged-in admin can list, view, or delete messages
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAdminUser()]
