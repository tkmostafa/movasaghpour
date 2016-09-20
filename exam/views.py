from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import type,year,lesson,exam
from post.models import post
from django.core import serializers
from django.http import JsonResponse
from django.utils.encoding import smart_str
from wsgiref.util import FileWrapper
import os


def base(request):
	latest_p=post.objects.all()[0:5]
	types=type.objects.all()
	years=year.objects.all()
	lessons=lesson.objects.all()
	return render(request,"exam/exams.html",{'latest_p':latest_p,'types':types,'years':years,'lessons':lessons})

def get_exams(request):
	if request.GET["year"] !="all" and request.GET["year"] !="":
		years=year.objects.filter(id=request.GET["year"])
	else:
		years=year.objects.all()
	if request.GET["lesson"] !="all" and request.GET["lesson"] !="":
		lessons=lesson.objects.filter(id=request.GET["lesson"])
	else:
		lessons=lesson.objects.all()
	if request.GET["type"] !="all" and request.GET["type"] !="":
		types=type.objects.filter(id=request.GET["type"])
	else:
		types=type.objects.all()

	exams=exam.objects.filter(year__in=years,lesson__in=lessons,type__in=types)
	result={}
	result['fields'] = serializers.serialize('json', exams)
	return HttpResponse(JsonResponse(result), content_type='application/json')

def get_exam(request):
	e=exam.objects.filter(id=request.GET["id"])[0]
	return HttpResponse(JsonResponse({'result':e}), content_type='application/json')


def get_file(request):
	e=exam.objects.filter(id=request.GET["id"])[0]
	filename = e.file
	wrapper = FileWrapper(file(filename))
	response = HttpResponse(wrapper, content_type='text/plain')
	response['Content-Length'] = os.path.getsize(filename)
	return response