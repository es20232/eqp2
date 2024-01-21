from rest_framework.routers import DefaultRouter
from api.urls import post_router
from django.urls import path, include

router = DefaultRouter()

#Posts -- DashBoard
router.registry.extend(post_router.registry)

urlpatterns = [
    path('', include(router.urls))
]

#comments

#likes

#profile_user