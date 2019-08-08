from django.contrib import admin
from .models import CustomUser, Job, Department
# Register your models here.
from django.contrib.auth.admin import UserAdmin

admin.site.register(CustomUser, UserAdmin)  

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    pass


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass