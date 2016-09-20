from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import day_week,paye,zang,timetablefield
from django.core import serializers
from django.http import JsonResponse
from post.models import post
from django.core.serializers.json import DjangoJSONEncoder

def time_table(request):
    latest_p=post.objects.all()[0:5]
    days=day_week .objects.all()
    payes=paye.objects.all()
    zangs=zang.objects.all()
    return render(request,"timetable/timetable.html",{'latest_p':latest_p,'days':days,'payes':payes,'zangs':zangs})

def get_timetable(request):
    fields=timetablefield.objects.all()
    result={}
    result['fields'] = serializers.serialize('json', fields)
    return HttpResponse(JsonResponse(result), content_type='application/json')