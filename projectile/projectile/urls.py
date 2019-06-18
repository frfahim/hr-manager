from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from core import views
from core.views import UserLoginView, UserLogoutView


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user/', include('core.urls')),
    path('api/request/', include('employee_request.urls')),

    path("api/login/", UserLoginView.as_view(), name="user-login"),
    path("api/logout/", UserLogoutView.as_view(), name="user-logout"),

    # re_path(r'^requests/', views.index, name="home-request-list"),

    path('', views.index, name='home'),
    # the api auth part
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
