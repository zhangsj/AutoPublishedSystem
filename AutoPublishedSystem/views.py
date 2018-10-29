# encoding=utf8
import datetime
import os
import json
import logging
import hashlib
import sys
import threading  
import urllib
import re
import traceback
import jenkins

from AutoPublishedSystem.models import *
from AutoPublishedSystem.common.pytjenkins import pyjks
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt


reload(sys)
Logger = logging.getLogger('AutoPublishedSystem.custom')
CLIENT_INFO = ('AutoPublishedSystem', 'AutoPublishedSystem')
pytjenkins = pyjks()

def login(request):
    '''登陆页'''
    try:
        context = {}
        context["login_path"] = "/AutoPublishedSystem/login_check/"
        return render(request,"login.html",context)
    except Exception as e:
        errorMsg = "login page error...%s: %s"%(e,traceback.format_exc())
        Logger.info(errorMsg)
def login_check(request):
    '''登陆验证'''
    try:
        context = {}
        context.update(csrf(request))
        if request.POST:
            username = request.POST["username"]
            password = request.POST["password"]
            user = auth.authenticate(username=username,password=password)
            if user:
                auth.login(request,user)
                request.session["username"] = username
                return redirect('/AutoPublishedSystem/index/')
            else:
                return redirect('/AutoPublishedSystem/login/')
        else:
            return redirect('/AutoPublishedSystem/')
    except Exception as e:
        errorMsg = "login_check error...%s: %s" % (e, traceback.format_exc())
        Logger.info(errorMsg)

def logout(request):
    '''注销'''
    try:
        auth.logout(request)
        return redirect('/AutoPublishedSystem/')
    except Exception as e:
        errorMsg = "logout error...%s: %s" % (e, traceback.format_exc())
        Logger.info(errorMsg)

# 首页展示，获取导航栏数据
@login_required
def index(request):
    businessInfoList = pytjenkins.get_jk_info()
    totaljobs,releaseTotal = pytjenkins.get_build_total()
    return render(request, 'index.html', {'businessInfoList': businessInfoList, 'releaseTotal': releaseTotal, 'totalBusiness':totaljobs})

@login_required
def deployForm(request):
    businessInfoList = pytjenkins.get_jk_info()
    mb = request.GET['mb']
    sb = request.GET['sb']
    return render(request, 'deploy.html',{'mb':mb,'sb':sb,'businessInfoList': businessInfoList})

@login_required
def deployjob(request):
    result={}
    sb = request.GET['sb']
    env = request.GET['env']
    Logger.info(env)
    businessInfoList = pytjenkins.deploy_Pro(sb,dep_env=env)
    if businessInfoList:
        result['success'] = 'ok'
    else:
        result['success'] = 'fail'
    return HttpResponse(json.dumps(result), content_type="application/json")

@login_required
def getjobenv(request):
    sb = request.GET['sb']
    user = request.user
    Logger.info(user.username)
    if request.user.username == 'admin':
        env_li = pytjenkins.get_job_env(sb)
    else:
        env_li = ['test']
    result = {}
    result['env'] = env_li
    return HttpResponse(json.dumps(result), content_type="application/json")

@login_required
def viewjob(request):
    result = {}
    sb = request.GET['sb']
    jobinfo = pytjenkins.get_job_con(sb)
    result['info'] = jobinfo
    return HttpResponse(json.dumps(result), content_type="application/json")
