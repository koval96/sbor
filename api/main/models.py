from pydoc import describe
from time import time

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class ExtendedUser(AbstractUser):
    email = models.EmailField(blank=False, unique=True, max_length=255, verbose_name='User Email')
    age = models.IntegerField(default=0)
    education = models.CharField(max_length=100, null=True)
    type = models.CharField(max_length=10)
    operations = models.ManyToManyField("Volunteer", related_name="user_operations", blank=True)


    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

class Facility(models.Model):
    name = models.CharField(max_length=100)

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

class Volunteer(models.Model):
    user = models.ForeignKey(ExtendedUser, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=100, default="На поисках")
    date_joined = models.DateField(auto_now_add=True)
    operation = models.ForeignKey("Operation", on_delete=models.DO_NOTHING, null=True, blank=True)

    class Meta:
        ordering = ("-id",)

class Operation(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField()
    search_start = models.DateField()
    adress = models.CharField(max_length=100)
    head = models.ManyToManyField(ExtendedUser, related_name="event_head", blank=True)
    volunteers = models.ManyToManyField(Volunteer, related_name="event_volunteers", blank=True)
    facility = models.ManyToManyField(Facility, related_name="event_facility", blank=True)
    plan = models.TextField(default="")
    coords = models.CharField(max_length=100, default="", blank=True)
    status = models.CharField(max_length=50, default="Не найден")