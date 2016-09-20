from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import teacher
from django.core import serializers
from django.http import JsonResponse
from post.models import post



def base(request):
	teachers=teacher.objects.all()
	latest_p=post.objects.all()[0:5]
	return render(request,"teacher/teachers.html",{'teachers':teachers,'latest_p':latest_p})