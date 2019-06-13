from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .models import EmployeeRequest


class EmployeeRequestAdmin(admin.ModelAdmin):
    search_fields = ('title', 'request_by', 'processed_by')
    list_display = ('title', 'request_by', 'processed_by')
    list_filter = ('request_status', )

admin.site.register(EmployeeRequest, EmployeeRequestAdmin)