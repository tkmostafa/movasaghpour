from django.db import models
from django.contrib.auth.models import User


class comment(models.Model):
    text=models.TextField()
    name=models.CharField(max_length=100)
    like=models.IntegerField(default=0)
    dislike=models.IntegerField(default=0)
    email=models.CharField(max_length=200, null=True)


    def __str__(self):
        return self.name


class Image(models.Model):
    img = models.FileField(upload_to='images/')
    
    def __str__(self):
        return self.img.name


class post(models.Model):
    title = models.CharField(max_length=300)
    date=models.DateField()
    summ=models.TextField()
    main=models.TextField()
    comments=models.ManyToManyField(comment, blank=True)
    c_l=models.IntegerField(default=0, null=True)
    seen=models.IntegerField(default=0)
    like=models.IntegerField(default=0)
    dislike=models.IntegerField(default=0)
    main_pic= models.FileField(upload_to='images/',null=True)

    def __str__(self):
        return self.title



