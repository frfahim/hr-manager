from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

from .enums import PersonGroup

class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=24)
    email = models.EmailField(_('email address'), unique=True)
    person_group = models.IntegerField(
        choices=PersonGroup.choices(),
        default=PersonGroup.EMPLOYEE,
    )
    photo = models.ImageField(upload_to='uploads', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        verbose_name = "Employee"
        verbose_name_plural = "Employees"

    def __str__(self):
        return "#{}: {}".format(self.id, self.email)

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

