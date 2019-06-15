from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.UserListView.as_view(), name='user-list'),
    path("login/", views.UserLoginAPIView.as_view(), name="user-login"),
    path("logout/", views.UserLogoutView.as_view(), name="user-logout"),
    path('<int:pk>/', views.UserDetailsView.as_view(), name='user-details'),
]