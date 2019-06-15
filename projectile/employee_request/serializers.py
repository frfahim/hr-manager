from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from core.serializers import UserSerializer
from .models import EmployeeRequest


class RequestCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeRequest
        fields = (
            'title',
            'description',
        )

class RequestListSerializer(RequestCreateSerializer):
    request_by = UserSerializer()
    processed_by = UserSerializer()

    class Meta:
        model = EmployeeRequest
        fields = RequestCreateSerializer.Meta.fields + (
            'id',
            'request_by',
            'processed_by',
            'request_status',
            'created_at',
        )
