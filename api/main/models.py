from time import time

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class ExtendedUser(AbstractUser):
    email = models.EmailField(blank=False, unique=True, max_length=255, verbose_name='User Email')
    type = models.CharField(max_length=10)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"