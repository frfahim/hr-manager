from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from core.enums import PersonGroup
from .enums import RequestStatus
from .helpers import filter_employee_request_permission_wise
from .models import EmployeeRequest
from .serializers import RequestListSerializer, RequestCreateSerializer, RequestUpdateSerializer


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

    def perform_create(self, serializer):
        serializer.save(request_by=self.request.user)

class RequestDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    lookup_field = 'pk'
    queryset = EmployeeRequest.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestListSerializer
        elif self.request.method == 'PATCH':
            return RequestUpdateSerializer
        else:
            return RequestCreateSerializer

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

