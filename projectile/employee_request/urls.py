from django.urls import path, include

from .views import RequestListView, RequestDetailsView

urlpatterns = [
    path('', RequestListView.as_view(), name='request-list'),
    path('<int:pk>/', RequestDetailsView.as_view(), name='request-details'),
]