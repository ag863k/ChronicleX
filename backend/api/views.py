from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .models import Blog
from .serializers import UserSerializer, BlogSerializer
from .permissions import IsAuthorOrReadOnly 

# --- User Authentication Views ---
# (UserCreateView, CustomAuthTokenLoginView, UserLogoutView remain the same as before)
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class CustomAuthTokenLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email
        })

class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# --- Blog Views ---

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-publication_date')
    serializer_class = BlogSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Default permission

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        - AllowAny for 'list' and 'retrieve' actions (GET requests).
        - IsAuthenticated for 'create'.
        - IsAuthorOrReadOnly for 'update', 'partial_update', 'destroy'.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else: # 'update', 'partial_update', 'destroy'
            permission_classes = [IsAuthorOrReadOnly] 
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Blog.objects.all().order_by('-publication_date')
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(author__username=username)
        return queryset
