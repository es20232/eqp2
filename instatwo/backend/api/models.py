from django.db import models

# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['post', str(instance.id_post), filename])

class User(models.Model):
    id_user = models.IntegerField()
    username = models.CharField(max_length=50)
    birthdate = models.DateField()
    email = models.EmailField()
    password = models.TextField()

class Post(models.Model):
    id_post = models.IntegerField()
    # id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    media = models.ImageField(upload_to=upload_path, blank=True, null=True)
    caption = models.TextField()

class Comment(models.Model):
    id_comment = models.IntegerField()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    
class Like(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)