"""
Django settings for club project.

Generated by 'django-admin startproject' using Django 3.2.14.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-b*2*!+w)gbq)=imkg74*&ik&y3x)bsr)sfw&k9812c^g)azi8('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bloc',
    'enventos',
    'reservas',
    'django_cleanup',
    'social_django',
     'social_core',
     'django.contrib.sites',
      'corsheaders',
    'rest_framework',
    # Add the following django-allauth apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
     # for Google OAuth 2.0
]

CLEANUP_KEEP = True  # Esto es importante para mantener los archivos temporales hasta su próxima ejecución.
CLEANUP_DAYS = 1  # El tiempo en días que los archivos se mantendrán en la carpeta temporal.
SITE_ID = 2

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
      'allauth.account.middleware.AccountMiddleware',
       'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000'
]
ROOT_URLCONF = 'club.urls'
TEMPLATE_LOADERS = (
    'social_django.templatetags.social_django',
)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'client/build')],
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


WSGI_APPLICATION = 'club.wsgi.application'

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'club',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',  # Puedes cambiarlo si tu MySQL está en un host diferente
        'PORT': '3306',       # Puede variar según tu configuración
    }
}


APPEND_SLASH = False

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOGIN_REDIRECT_URL = '/'

# Additional configuration settings
SOCIALACCOUNT_QUERY_EMAIL = True
ACCOUNT_LOGOUT_ON_GET= True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = True
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS=[os.path.join(BASE_DIR,'client/build/static')]
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY="515179264545-ve9pa32g4np3oqme4f2u6b71tme790sf.apps.googleusercontent.com",
SOCIAL_AUTH_GOOGLE_SECRET="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"
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
SOCIALACCOUNT_QUERY_EMAIL = True
ACCOUNT_LOGOUT_ON_GET= True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTHENTICATION_BACKENDS = [
     'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend'
]
LOGIN_URL='login'
LOGIN_REDIRECT_URL='home'
LOGOUT_URL='logout'
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}
STATIICFILES_DIRS=[
    os.path.join(BASE_DIR, 'client/build/static')
]
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY="515179264545-ve9pa32g4np3oqme4f2u6b71tme790sf.apps.googleusercontent.com"
SOCIAL_AUTH_GOOGLE_SECRET="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"