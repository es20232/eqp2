from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import PostSerializer
from .models import Post

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        id_post = request.data['id_post']
        media = request.data['media']
        caption = request.data['caption']
        Post.objects.create(id_post=id_post, media=media, caption=caption)
        return HttpResponse("Post created", status=200)