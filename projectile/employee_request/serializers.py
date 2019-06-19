from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from core.serializers import UserSerializer
from .models import EmployeeRequest


class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeRequest
        fields = (
            'id',
            'request_status',
            'title',
            'description',
            'processed_by'
        )


class RequestListSerializer(RequestSerializer):
    request_by = UserSerializer()
    processed_by = UserSerializer()

    class Meta:
        model = EmployeeRequest
        fields = RequestSerializer.Meta.fields + (
            'request_by',
            'processed_by',
            'created_at',
        )
