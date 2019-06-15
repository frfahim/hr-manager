from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'person_group',
        )


class UserCeateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        required=True,
        write_only=True,
        allow_blank=False,
    )

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'person_group',
            'photo',
        )

    def validate_password(self, value):
        if value:
            value = make_password(value)
        return value

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
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