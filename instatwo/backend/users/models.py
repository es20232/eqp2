from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
# Create your models here.
