from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core import serializers
from django.http import JsonResponse
from post.models import post
from django.core.serializers.json import DjangoJSONEncoder
from .models import morede_enzebati,karname_time,karname


def base(request):
	latest_p=post.objects.all()[0:5]
	m_z=morede_enzebati.objects.filter(user=request.user)
	ks=karname.objects.filter(user=request.user)
	return render(request,"userP/userP.html",{'latest_p':latest_p,'mavared':m_z,'karname':ks,'user':request.user})