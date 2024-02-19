from django.contrib import admin
from .models import User, Token, Post, Comment, Like

admin.site.register(User)
admin.site.register(Token)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)