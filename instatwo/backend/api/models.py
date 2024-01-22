from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth.tokens import default_token_generator

# Create your models here.

class User(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)


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