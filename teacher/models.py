from django.db import models

class teacher(models.Model):
	name=models.CharField(max_length=100)
	description=models.CharField(max_length=200)
	main_pic= models.FileField(upload_to='images/',null=True)

	def __str__(self):
		return self.name