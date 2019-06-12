from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (_('Creditential'), {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'person_group', 'photo')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',)}),
    )
    search_fields = ('email', 'first_name', 'last_name')
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    list_filter = ('person_group', 'is_active')
    # ordering = ('id',)

admin.site.register(User, UserAdmin)
