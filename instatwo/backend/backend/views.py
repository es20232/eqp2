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
    

def signup(request):
    if request.method == 'GET':
        return render(request, 'cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        

        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse('Já existe um usuário com esse username')
        
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return HttpResponse('Usuário cadastrado com sucesso')
    
def login(request):
    if request.method == "GET":
        return render(request, 'login.html')
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            login_django(request, user)
            if request.user.is_authenticated:
                return HttpResponse('Autenticado')
        else:
            return HttpResponse('Login ou senha incorreta')
        