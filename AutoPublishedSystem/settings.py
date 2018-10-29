
"""
Django settings for AutoPublishedSystem project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
ROOT_DIR = os.getcwd()
RESOURCE_DIR = ROOT_DIR + "/media"
TEMPLATE_DIR = ROOT_DIR + "/templates"
LOG_DIR = ROOT_DIR + "/logs"
LOGIN_URL = '/AutoPublishedSystem/login/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    RESOURCE_DIR,
    
)
TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    TEMPLATE_DIR,
)

# set session serialize object
SESSION_COOKIE_NAME='APS'
SESSION_COOKIE_AGE=60*60*2
SESSION_EXPIRE_AT_BROWSER_CLOSE=True
SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.request',
)
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'qf!6^4vg164+xybqe7k5r77+@51by4t8k9w=oma2h_hb7z-$^7'
#SECRET_KEY = '81d5xs@nugrmlry^*njju(i7xcdcw(x#4^v0_@r(d_5#uzw%x='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'AutoPublishedSystem',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 5,
}

ROOT_URLCONF = 'AutoPublishedSystem.urls'

WSGI_APPLICATION = 'AutoPublishedSystem.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.mysql',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
#        'NAME': 'cmdb',  # Or path to database file if using sqlite3.
#        'USER': 'root',  # Not used with sqlite3.
#        'PASSWORD': 'Root.123',  # Not used with sqlite3.
#        'HOST': '127.0.0.1',  # Set to empty string for localhost. Not used with sqlite3.
#        'PORT': '3306',  # Set to empty string for default. Not used with sqlite3.
#    }
#}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/AutoPublishedSystem/media/'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': '%(asctime)s FuncName:%(funcName)s LINE:%(lineno)d [%(levelname)s]- %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },        
    },    
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {                
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': True,
        },
        'default': {
            'level':'INFO',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR,'AutoPublishedSystem_info.log'),
            'maxBytes': 1024*1024*500, # 500 MB
            'backupCount': 5,
            'formatter':'standard',
        },
        'default_debug': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR,'AutoPublishedSystem_debug.log'),
            'maxBytes': 1024*1024*500, # 500 MB
            'backupCount': 5,
            'formatter':'standard',
        },        
        'console':{
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard'
        },
        'request_handler': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOG_DIR,'AutoPublishedSystem_script.log'),
            'maxBytes': 1024*1024*500, # 500 MB
            'backupCount': 5,
            'formatter':'standard',
        },      
    },
    'loggers': {
        'django': {
            'handlers': ['console','default_debug'],
            'level': 'DEBUG',
            'propagate': False
        },         
        'django.request': {
            'handlers': ['request_handler'],
            'level': 'DEBUG',
            'propagate': False
        },                       
        'AutoPublishedSystem.custom':{
            'handlers': ['default','console'],
            'level': 'INFO',
            'propagate': True        
        },      
    }
}

