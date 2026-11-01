"""
Django settings for portfolio_backend project.

Architecture:
- Framework: Django 6.x
- API: Django REST Framework (DRF)
- Database: MySQL (via PyMySQL)
- Cross-Origin Resource Sharing (CORS): django-cors-headers
- Static & Media: Local file storage for portfolio assets and uploaded CVs
"""

from pathlib import Path
import os
import urllib.parse
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-5mmt3tn0+u@^0g!frwf0!non5^-7t0-qb^gi()&6a*6116w5rn')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True').lower() in ('true', '1', 'yes')

ALLOWED_HOSTS = ['*']

# CSRF Trusted Origins for Vercel and local development
CSRF_TRUSTED_ORIGINS = [
    'https://*.vercel.app',
    'https://*.now.sh',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]

# Application definition
INSTALLED_APPS = [
    # Core Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party packages
    'rest_framework',
    'corsheaders',
    
    # Local portfolio app
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Must precede CommonMiddleware for CORS headers
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio_backend.wsgi.application'

# ============================================================================
# Database Configuration (MySQL / Aiven Cloud Support)
# ============================================================================
DATABASE_URL = os.environ.get('DATABASE_URL', '').strip()
if DATABASE_URL:
    url = urllib.parse.urlparse(DATABASE_URL)
    DB_NAME = url.path.lstrip('/') or 'defaultdb'
    DB_USER = urllib.parse.unquote(url.username or '') or 'avnadmin'
    DB_PASSWORD = urllib.parse.unquote(url.password or '')
    DB_HOST = url.hostname or '127.0.0.1'
    DB_PORT = str(url.port or 3306)
else:
    DB_NAME = os.environ.get('DB_NAME', 'sohan_portfolio_db')
    DB_USER = os.environ.get('DB_USER', 'root')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', '')
    DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
    DB_PORT = os.environ.get('DB_PORT', '3306')

db_options = {
    'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
    'charset': 'utf8mb4',
}

# SSL support only for remote cloud databases (e.g. Aiven MySQL)
is_remote_db = DB_HOST not in ('127.0.0.1', 'localhost', '')
if is_remote_db:
    ca_file = BASE_DIR / 'ca.pem'
    if ca_file.exists():
        db_options['ssl'] = {'ca': str(ca_file)}
    elif os.environ.get('DB_SSL_CA'):
        db_options['ssl'] = {'cadata': os.environ['DB_SSL_CA']}
    elif os.environ.get('DB_SSL_REQUIRED', '').lower() in ('true', '1', 'required') or 'aivencloud.com' in DB_HOST:
        db_options['ssl'] = {'check_hostname': False}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
        'OPTIONS': db_options,
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Dhaka'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

# Media uploads (Profile avatars, project screenshots, resume files)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ==============================================================================
# EMAIL NOTIFICATION SETTINGS
# ==============================================================================
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', 'sohanuddin404@gmail.com')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '').strip()

# Automatically switch to live Gmail SMTP when App Password is provided in .env
if EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = f'Sohan Portfolio <{EMAIL_HOST_USER}>'
NOTIFICATION_RECIPIENT_EMAIL = 'sohanuddin404@gmail.com'

# CORS (Cross-Origin Resource Sharing) Configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
