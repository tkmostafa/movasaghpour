from django.db import models

class type(models.Model):
	title=models.CharField(max_length=100)
	def __str__(self):
		return self.title

class year(models.Model):
	title=models.CharField(max_length=100)
	def __str__(self):
		return self.title



class lesson(models.Model):
	title=models.CharField(max_length=100)
	def __str__(self):
		return self.title


class exam(models.Model):
	title=models.CharField(max_length=100)
	lesson=models.ForeignKey(lesson)
	year=models.ForeignKey(year)
	type=models.ForeignKey(type)
	file=models.FileField(upload_to='files/',null=False)
	def __str__(self):
		return self.title