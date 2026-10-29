"""
api/tests.py
============
Automated tests for Django REST Framework endpoints.

Run tests using:
python manage.py test api
"""

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Profile, Project, ContactMessage


class PortfolioAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile = Profile.objects.create(
            name="Sohanur Rahman Sohan",
            tagline="Full-Stack Software Engineer | Django & Laravel Specialist"
        )
        self.project = Project.objects.create(
            title="Test Portfolio Project",
            tagline="Sample project for testing",
            description="Testing description",
            category="Full Stack",
            tech_stack="Python, Django, React, MySQL"
        )

    def test_get_portfolio_all_data(self):
        """Test that the unified /api/portfolio/ endpoint returns 200 OK and valid JSON"""
        url = reverse('portfolio-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('profile', response.data)
        self.assertIn('projects', response.data)
        self.assertEqual(response.data['profile']['name'], "Sohanur Rahman Sohan")

    def test_contact_form_submission(self):
        """Test submitting the contact form via /api/contact/"""
        url = reverse('contact-submit')
        payload = {
            'name': 'Test Recruiter',
            'email': 'recruiter@company.com',
            'subject': 'Job Offer',
            'message': 'We would like to hire you for our Django and Laravel team.'
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(ContactMessage.objects.count(), 1)
