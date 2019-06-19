from django.urls import path, include

from . import views

urlpatterns = [
    path('me/', views.UserDetailsView.as_view(), name='user-details'),
    path('', views.UserListView.as_view(), name='user-list'),
]
