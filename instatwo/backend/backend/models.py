from django.db import models
from users.models import User


# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['media', str(instance.id_post.id.post), filename])


class Post(models.Model):
    id_post = models.IntegerField()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ImageField(upload_to='images/', blank=True, null=True)
    caption = models.TextField()

class Comment(models.Model):
    id_comment = models.IntegerField()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    
class Like(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    weight = models.IntegerField()
    date = models.DateField(auto_now_add=True)