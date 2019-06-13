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
            'request_status',
            'request_by',
            'processed_by',
        )

class RequestListSerializer(RequestCreateSerializer):
    request_by = UserSerializer()
    processed_by = UserSerializer()

    class Meta:
        model = EmployeeRequest
        fields = RequestCreateSerializer.Meta.fields
