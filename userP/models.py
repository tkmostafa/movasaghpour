from django.db import models
from django.contrib.auth.models import User

class morede_enzebati(models.Model):
	matn=models.TextField()
	user=models.ForeignKey(User)	

	def __str__(self):
		return self.user.username


class karname_time(models.Model):
	title=models.CharField(max_length=100)
	def __str__(self):
		return self.title


class karname(models.Model):
	time=models.ForeignKey(karname_time)
	user=models.ForeignKey(User)
	file=models.FileField(upload_to='karname/',null=True)

	def __str__(self):
		return self.user.username