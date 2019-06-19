from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError

from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from core.enums import PersonGroup
from .enums import RequestStatus
from .helpers import filter_employee_request_permission_wise
from .models import EmployeeRequest
from .serializers import RequestListSerializer, RequestSerializer


class RequestListView(generics.ListCreateAPIView):
    """
    get:
    Return a list of employee request
    Authenticate user will get list
    data set will be based on user person group

    post:
    Create a new request by log in user
    Authenticate users can create new request
    """
    permission_classes = (IsAuthenticated, )

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestListSerializer
        else:
            return RequestSerializer

    def get_queryset(self):
        queryset = EmployeeRequest.objects.all().select_related(
            'request_by',
            'processed_by',
        )
        queryset = filter_employee_request_permission_wise(self, queryset)
        return queryset.order_by('id')

    def perform_create(self, serializer):
        serializer.save(request_by=self.request.user)

class RequestDetailsView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    details data of a employee request

    update:
    a request can be updated by hr and manage users
    """
    permission_classes = (IsAuthenticated, )
    lookup_field = 'pk'
    queryset = EmployeeRequest.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestListSerializer
        elif self.request.method == 'PATCH':
            return RequestSerializer
        else:
            return RequestSerializer

    def update(self, request, *args, **kwargs):
        try:
            # employee user can not update a request
            if request.user.person_group == PersonGroup.EMPLOYEE.value:
                content = {'error': '{}'.format('You have no permission to update a request')}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
            return super(RequestDetailsView, self).update(request, *args, **kwargs)
        except IntegrityError as exception:
            content = {'error': '{}'.format(exception)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

