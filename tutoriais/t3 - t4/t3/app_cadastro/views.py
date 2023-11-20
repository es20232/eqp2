from django.shortcuts import render
from.models import Usuario

def home(request):
     return render (request,'usuarios/home.html')

def usuarios(request):
    novo_usuario = Usuario()
    novo_usuario.usuario = request.POST.get('nick')
    novo_usuario.senha = request.POST.get('senha')
    novo_usuario.save()

    usuarios = {
    'usuarios': Usuario.objects.all()
    
    }

    return render (request,'usuarios/usuarios.html',usuarios)