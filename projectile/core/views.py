from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render


from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User
from .serializers import UserSerializer, UserLoginSerializer, UserCeateSerializer

def index(request):
    return render(request, 'index.html')

class UserListView(generics.ListCreateAPIView):
    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        else:
            return UserCeateSerializer

    queryset = User.objects.all().order_by('id')


class UserLoginView(generics.CreateAPIView):
    permission_classes = ()
    serializer_class = UserLoginSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            return Response({"token": user.auth_token.key})
        else:
            return Response(
                {"error": "Wrong Credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )


class UserLogoutView(views.APIView):
    def get(self, request, format=None):
        logout(request)
        return Response(
            {"message": "Successfully log out!"},
            status=status.HTTP_400_BAD_REQUEST
        )