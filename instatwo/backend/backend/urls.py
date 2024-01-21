from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include([
        path('cadastro/', views.signup, name='cadastro'),
        path('login/',views.login, name='login')
        # Outras rotas relacionadas ao 'auth' aqui, se necessário
    ]))
    #path('api/', include('backend.api.urls')),
]
