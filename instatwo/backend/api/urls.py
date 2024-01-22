from django.urls import path
from . import views

urlpatterns = [
    path('signin', views.signin, name="signin"),
    path('signout', views.signout, name="signout"),
    path("reset_password", views.reset_password, name="reset_password"),
    path("change_password", views.change_password, name="change_password"),
    path("create_user", views.create_user_test, name="create_user_test")
]
