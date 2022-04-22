from time import time

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class ExtendedUser(AbstractUser):
    email = models.EmailField(blank=False, unique=True, max_length=255, verbose_name='User Email')
    age = models.IntegerField(default=0)
    education = models.CharField(max_length=100, null=True)
    type = models.CharField(max_length=10)
    operations = models.ManyToManyField("Operation", related_name="user_operations", blank=True)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

class Facility(models.Model):
    name = models.CharField(max_length=100)

class Operation(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField()
    search_start = models.DateField()
    adress = models.CharField(max_length=100)
    head = models.ManyToManyField(ExtendedUser, related_name="event_head", blank=True)
    volunteers = models.ManyToManyField(ExtendedUser, related_name="event_volunteers", blank=True)
    facility = models.ManyToManyField(Facility, related_name="event_facility", blank=True)