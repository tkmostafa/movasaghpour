from django.db import models




class day_week(models.Model):
    title = models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.title

class zang(models.Model):
    title = models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.title


class paye(models.Model):
    title = models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.title


class timetablefield(models.Model):
    title = models.CharField(max_length=100)
    teacher=models.CharField(max_length=100)
    day=models.ForeignKey(day_week)
    zang=models.ForeignKey(zang)
    paye=models.ForeignKey(paye)

    def __str__(self):
        return self.title