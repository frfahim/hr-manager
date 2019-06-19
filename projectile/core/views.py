from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render

from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer, UserLoginSerializer

def index(request):
    return render(request, 'index.html')

class UserListView(generics.ListCreateAPIView):
    """
    get:
    Return a list of all the users.
    Authenticate user will get list

    post:
    Create a new user instance.
    Any user can post
    """
    def get_permissions(self):
        # set api permission based on request type
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticated, ]
        else:
            self.permission_classes = [ ]

        return super(UserListView, self).get_permissions()

    serializer_class = UserSerializer

    queryset = User.objects.all().order_by('id')


class UserDetailsView(views.APIView):
    """
    Return request user details
    """
    def get(self, request):
        user = User.objects.filter(id=self.request.user.id)
        serializer = UserSerializer(user.first())
        return Response(serializer.data)


class UserLoginView(generics.CreateAPIView):
    """
    post:
    Request with email and password
    if user is authenticate return user details with token
    """
    permission_classes = ()
    serializer_class = UserLoginSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            login(request, user)
            user_serializer = UserSerializer(user)
            return Response(
                {"token": user.auth_token.key, "user": user_serializer.data}
            )
        else:
            return Response(
                {"error": "Wrong Credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )


class UserLogoutView(views.APIView):
    """
    logged out current login user
    """
    def get(self, request, format=None):
        logout(request)
        return Response()
