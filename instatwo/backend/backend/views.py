from django.http.response import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from rest_framework import viewsets
from .serializers import PostSerializer
from .models import Post


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
       media = request.data['media']
       id_user = request.data['id_user']
       id_post = request.data['id_post']
       Post.objects.create(media=media, id_user=id_user, id_post=id_post)
       return HttpResponse("Post created")