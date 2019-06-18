from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.UserListView.as_view(), name='user-list'),
    path('<int:pk>/', views.UserDetailsView.as_view(), name='user-details'),
    path('me/', views.UserProfileDetailsView.as_view(), name='user-details-token'),
]