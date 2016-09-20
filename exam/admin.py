from django.contrib import admin
from .models import type,year,lesson,exam

# Register your models here.
admin.site.register(type)
admin.site.register(year)
admin.site.register(lesson)
admin.site.register(exam)
