from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserCreateView,
    CustomAuthTokenLoginView,
    UserLogoutView,
    BlogViewSet
)

router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog') 
urlpatterns = [
    path('auth/signup/', UserCreateView.as_view(), name='user-signup'),
    path('auth/login/', CustomAuthTokenLoginView.as_view(), name='user-login'),
    path('auth/logout/', UserLogoutView.as_view(), name='user-logout'),
    path('', include(router.urls)), 
]