from django.db import models
from users.models import User


# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['media', str(instance.id.id), filename])


class Post(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ImageField(upload_to='images/', blank=True, null=True)
    caption = models.TextField()

class Comment(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    
class Like(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)