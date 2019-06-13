from django.contrib import admin
from django.urls import path, include

from core import views
from core.views import UserLoginView, UserLogoutView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('core.urls')),
    path('api/request/', include('employee_request.urls')),

    path("api/login/", UserLoginView.as_view(), name="user-login"),
    path("api/logout/", UserLogoutView.as_view(), name="user-logout"),

    path('', views.index, name='home'),
]
