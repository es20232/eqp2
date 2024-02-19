from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth.tokens import default_token_generator
from .managers import UserManager
from datetime import datetime

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True, null=True)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    expire_at = models.DateTimeField(auto_now_add=True)

    def initialize(self):
        self.token = default_token_generator.make_token(self.user)
        self.set_expire_time()

    def set_expire_time(self):
        self.expire_at = timezone.now() + timezone.timedelta(minutes=30)
    
    def is_expired(self) -> bool:
        return timezone.now() > self.expire_at

class Post(models.Model):
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    caption = models.TextField(null=True)
    posted_at = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Like(models.Model):
    weight = models.BooleanField(null=False)
    liked_at = models.DateTimeField(default=datetime.now)
    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    on_post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Comment(models.Model):
    text = models.TextField(null=False, blank=False)
    posted_at = models.DateTimeField(default=datetime.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
