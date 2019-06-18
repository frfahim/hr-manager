from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render


from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User
from .serializers import UserSerializer, UserLoginSerializer

def index(request):
    return render(request, 'index.html')

class UserListView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticated, ]
        else:
            self.permission_classes = [ ]

        return super(UserListView, self).get_permissions()

    serializer_class = UserSerializer

    queryset = User.objects.all().order_by('id')


class UserDetailsView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    lookup_field = 'pk'
    queryset = User.objects.all()


class UserProfileDetailsView(views.APIView):
    # permission_classes = ()

    def get(self, request):
        user = User.objects.filter(id=self.request.id)
        serializer = UserSerializer(user.first())
        return Response(serializer.data)


class UserLoginView(generics.CreateAPIView):
    permission_classes = ()
    serializer_class = UserLoginSerializer

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            login(request, user)
            return Response(
                {"token": user.auth_token.key, "user": user.id}
            )
        else:
            return Response(
                {"error": "Wrong Credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )


class UserLogoutView(views.APIView):
    def get(self, request, format=None):
        logout(request)
        return Response()
