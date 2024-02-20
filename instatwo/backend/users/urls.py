from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, EditProfileView, RequestResetPassword, ChangePassword, ListarUsuariosView
from .views import SendLike, PostComment, FeedPosts, SearchProfile, CreatePost, GetPostComments, GetPostLikes

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('edit-profile', EditProfileView.as_view(), name='edit-profile'),
    path('logout', LogoutView.as_view()),
    path('reset-password', RequestResetPassword.as_view()),
    path('change-password', ChangePassword.as_view()),
    path('send-like', SendLike.as_view()),
    path('post-comment', PostComment.as_view()),
    path('search-profiles', SearchProfile.as_view()),
    path('feed', FeedPosts.as_view()),
    path('create-post', CreatePost.as_view()),
    path('get-comments', GetPostComments.as_view()),
    path('get-likes', GetPostLikes.as_view()),
    path('users', ListarUsuariosView.as_view())
]
