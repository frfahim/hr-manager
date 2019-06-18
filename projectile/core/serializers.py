from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.db import transaction
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        required=True,
        write_only=True,
        allow_blank=False,
    )
    token = serializers.ReadOnlyField(source='auth_token.key', read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'password',
            'person_group',
            'photo',
            'token',
        )

    @transaction.atomic
    def create(self, validated_data):
        # request = self.context.get("request")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        # login by created user
        # user = authenticate(email=validated_data['email'], password=validated_data['password'])
        # if user and user.is_active:
        #     login(request, user)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        required=True,
        label='Email Address',
        allow_blank=False
    )
    password = serializers.CharField(
        required=True,
        label='Password',
        allow_blank=False,
        write_only=True,
        style={'input_type': 'password'},
    )