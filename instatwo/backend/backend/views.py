from rest_framework import viewsets
from django.http import HttpResponse
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