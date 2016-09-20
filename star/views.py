from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import star
from post.models import post
from django.core import serializers
from django.http import JsonResponse


def base(request):
	stars=star.objects.all()
	latest_p=post.objects.all()[0:5]
	return render(request,"star/stars.html",{'stars':stars,'latest_p':latest_p})