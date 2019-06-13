from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import EmployeeRequest
from .serializers import RequestListSerializer, RequestCreateSerializer
from .helpers import filter_employee_request_permission_wise

class RequestListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestListSerializer
        else:
            return RequestCreateSerializer

    def get_queryset(self):
        queryset = EmployeeRequest.objects.all().select_related(
            'request_by',
            'processed_by',
        )
        queryset = filter_employee_request_permission_wise(self, queryset)
        return queryset.order_by('id')

class RequestDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestListSerializer
        else:
            return RequestCreateSerializer

    lookup_field = 'pk'
    queryset = EmployeeRequest.objects.all()

