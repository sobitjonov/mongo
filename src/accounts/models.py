from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Job(models.Model):
    jobname = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.jobname


class Department(models.Model):
    departmentname = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.departmentname


class CustomUser(AbstractUser):
    pass
    # Automatic when data is inserted
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    # Automatic when data is updated
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    username = models.CharField(max_length=200, unique=True)
    firstname = models.CharField(max_length=200, null=True)
    lastname = models.CharField(max_length=200, null=True)
    dateofbirth = models.DateField()
    address = models.CharField(max_length=200, null=True)
    salary = models.IntegerField(default=0)
    ethnics = models.CharField(max_length=20, null=True)
    phone = models.CharField(max_length=20, null=True)
    password = models.CharField(max_length=20, null=True)
    email = models.EmailField(max_length=100, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True) 
    gender = models.CharField(max_length=20, null=True)

