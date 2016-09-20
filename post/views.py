from django.shortcuts import render
from django.http import HttpResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import Image,comment,post
from django.core import serializers
from django.http import JsonResponse


def base(request):
    posts=post.objects.all()[0:9]
    latest_p=post.objects.all()[0:5]
    return render(request,"post/index.html",{'posts':posts,'latest_p':latest_p,'a_p':1})

def base2(request):
    return base(request)


def contact_us(request):
    latest_p=post.objects.all()[0:5]
    return render(request,"post/contact.html",{'latest_p':latest_p})


def about_us(request):
    latest_p=post.objects.all()[0:5]
    return render(request,"post/about.html",{'latest_p':latest_p})

def like_post(request):
    if request.method =="GET":
        posts=post.objects.filter(id=request.GET["name"])
        p=posts[0]
        x=p.like
        p.like=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')



def dislike_post(request):
    if request.method =="GET":
        posts=post.objects.filter(id=request.GET["name"])
        p=posts[0]
        x=p.dislike
        p.dislike=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')


def like_cm(request):
    if request.method =="GET":
        cms=comment.objects.filter(id=request.GET["name"])
        p=cms[0]
        x=p.like
        p.like=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')



def dislike_cm(request):
    if request.method =="GET":
        cms=comment.objects.filter(id=request.GET["name"])
        p=cms[0]
        x=p.dislike
        p.dislike=x+1
        p.save()
        return HttpResponse(json.dumps({'result': x+1}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': "nothing"}), content_type='application/json')




def get_post(request ,post_id=1):
    p=post.objects.filter(id=post_id)[0]
    x=p.seen
    p.seen=x+1
    p.save()
    latest_p=post.objects.all()[0:5]
    return render(request,"post/single.html",{'post':p,'latest_p':latest_p})


def send_comment(request):
    if request.method=="GET":
        c=comment.objects.create(name=request.GET["name"],email=request.GET["email"],text=request.GET["text"])
        c.save()
        p=post.objects.filter(id=request.GET["id"])[0]
        p.comments.add(c)
        return HttpResponse(json.dumps({'result': True}), content_type='application/json')

def login_user(request):
    name="wrong"
    if request.method == "GET":
        users=User.objects.filter(username=request.GET["username"])
        if(len(users)>0):
            user=users[0]
            user2 = authenticate(username=user.username, password=request.GET["password"])
            if user2 is not None:
                if user2.is_active:
                    login(request,user2)
                    user3=User.objects.filter(username=request.GET["username"])[0]
                    return HttpResponse(json.dumps({'reg': "true",'name':user3.username}), content_type='application/json')
            else:
                return HttpResponse(json.dumps({'reg': "false"}), content_type='application/json')
        else:
            return HttpResponse(json.dumps({'reg': "false"}), content_type='application/json')


def get_pages(request):
    posts=post.objects.all()
    i=int(len(posts)/9)+1
    return HttpResponse(json.dumps({'result':i}), content_type='application/json')


def posts_page(request,post_page=1):
    posts=post.objects.all()[(int(post_page)-1)*9:(int(post_page))*9]
    latest_p=post.objects.all()[0:5]
    return render(request,"post/index.html",{'posts':posts,'latest_p':latest_p,'a_p':post_page})


def search_post(request):
    # posts=post.objects.filter(title__contains=request.POST["name"])
    posts=post.objects.all()
    latest_p=post.objects.all()[0:5]
    return render(request,"post/subpost.html",{'posts':posts,'latest_p':latest_p,'a_p':1})

def is_login(request):
    if request.user.is_authenticated() and not(request.user.is_superuser):
        return HttpResponse(json.dumps({'reg': True}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'reg': False}), content_type='application/json')


def logout_user(request):
    logout(request)
    return HttpResponse(json.dumps({'reg': True}), content_type='application/json')

def change_pw(request):
    if request.method=="POST":
        if request.POST["pw1"]==request.POST["pw2"]:
            us=request.user
            us.set_password(request.POST["pw1"])
            us.save()
            return HttpResponse(json.dumps({'reg': True}), content_type='application/json')
        else:
            return HttpResponse(json.dumps({'reg': False}), content_type='application/json')
    return HttpResponse(json.dumps({'reg': True}), content_type='application/json')
