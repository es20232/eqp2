from rest_framework import serializers
from .models import Post, Comment, Like, User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id_post', 'id_user', 'media', 'caption']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id_comment', 'id_user', 'id_post', 'text']

class   LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id_user', 'id_post']
    
class   userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'username', 'birthdate', 'email', 'password']
