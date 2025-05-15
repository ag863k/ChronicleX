from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog

class UserSerializer(serializers.ModelSerializer):
    blogs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'blogs'] 
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}, 
            'email': {'required': True} 
        }

    def create(self, validated_data):
        # Handle password hashing during user creation
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'publication_date', 'author', 'author_username']
        read_only_fields = ['author', 'publication_date']