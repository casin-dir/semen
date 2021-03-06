"""
Django settings for semen_iphone project.

Generated by 'django-admin startproject' using Django 1.10.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from configparser import ConfigParser

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 't=d($nb1xup53uunryhc3-bd8x4_@flwvy1x^uznm1%%i!8f(&'

PLATFORM_CONFIG_NAME = "goodmaster.conf"

production_config = os.path.join('/etc', 'goodmaster', PLATFORM_CONFIG_NAME)
development_config = os.path.join(BASE_DIR, PLATFORM_CONFIG_NAME)
config_path = production_config if os.path.exists(production_config) else development_config
config = ConfigParser()
config.read(config_path)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config.getboolean('common', 'DEBUG', fallback=True)

ALLOWED_HOSTS = ['*']

SITE_URL = config.get('common', 'SITE_URL', fallback='http://127.0.0.1:8000')
PERCENT = config.getint('common', 'PERCENT', fallback='20')
ADMINS = config.get('common', 'ADMINS', fallback='vladimir')

# Application definition

INSTALLED_APPS = [
    'django_q',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'semen',
    'crashes',
    'devices',
    'orders',
    'repairparts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'semen_iphone.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
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

WSGI_APPLICATION = 'semen_iphone.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'goodmaster',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': 3306,
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'TEST_CHARSET': 'utf8mb4'
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'

FCM_KEY = 'AAAAk_j4Yi8:APA91bGLAlHA5QGwAsduXIYhHln_wZ09SkV19XZhn2fq2agWULtFxNvUhOck7bKgj8K1zI-yYyGFIco8hJPgke5ENjz9H1I_j_6wqwI1XXmfzWwKQldBBhEq3o_jHuDkcXUPG2uiYAJu'
Q_CLUSTER = {
    'name': 'DjangORM',
    'workers': 1,
    'timeout': 90,
    'retry': 120,
    'queue_limit': 50,
    'bulk': 10,
    'orm': 'default'
}

STATIC_ROOT = '/opt/goodmaster/static/'

EMAIL_HOST = config.get('smtp', 'EMAIL_HOST', fallback='127.0.0.1')
EMAIL_HOST_USER = config.get('smtp', 'EMAIL_HOST_USER', fallback='')
EMAIL_HOST_PASSWORD = config.get('smtp', 'EMAIL_HOST_PASSWORD', fallback='')
EMAIL_PORT = config.get('smtp', 'EMAIL_PORT', fallback=1025)
EMAIL_USE_TLS = config.get('smtp', 'EMAIL_USE_TLS', fallback=False)
EMAILS = config.get('smtp', 'EMAILS', fallback='')
