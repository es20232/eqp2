from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, EditProfileView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('edit-profile', EditProfileView.as_view(), name='edit-profile'),
    path('logout', LogoutView.as_view())
]