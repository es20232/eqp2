from rest_framework import serializers
from .models import User, Post, Comment, Like

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'name', 'img', 'bio']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Associar o serializer ao modelo User
        fields = ['img']
        
class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'image', 'caption', 'posted_at', 'user']

class AuthorSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'text', 'posted_at', 'author']

class LikeSerializer(serializers.ModelSerializer):
    liked_by = AuthorSerializer()

    class Meta:
        model = Like
        fields = ['liked_by', 'weight', 'liked_at']