# encoding=utf8
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

urlpatterns = patterns('',
    url(r'^AutoPublishedSystem/$','AutoPublishedSystem.views.login'),
    url(r'^AutoPublishedSystem/login/$','AutoPublishedSystem.views.login'),
    url(r'^AutoPublishedSystem/login_check/$','AutoPublishedSystem.views.login_check'),
    url(r'^AutoPublishedSystem/logout/$','AutoPublishedSystem.views.logout'),
    url(r'^admin/', admin.site.urls),
    #url(r'^AutoPublishedSystem/$', 'AutoPublishedSystem.views.index', name='index'),
    url(r'^AutoPublishedSystem/index/$', 'AutoPublishedSystem.views.index', name='index'),
    url(r'^AutoPublishedSystem/createReleaseInstance/$', 'AutoPublishedSystem.views.deployjob', name='deployjob'),
    url(r'^AutoPublishedSystem/viewjob/$', 'AutoPublishedSystem.views.viewjob', name='viewjob'),
    url(r'^/AutoPublishedSystem/media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATICFILES_DIRS}),
    url(r'^AutoPublishedSystem/deployForm/$', 'AutoPublishedSystem.views.deployForm',name='deployForm'),
    url(r'^AutoPublishedSystem/show_deploy_model/$', 'AutoPublishedSystem.views.getjobenv',name='getjobenv'),
    )
