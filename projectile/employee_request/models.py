import datetime
from django.db import models

from core.models import User
from .enums import RequestStatus

class EmployeeRequest(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    request_status = models.IntegerField(
        choices=RequestStatus.choices(),
        default=RequestStatus.OPEN.value,
    )
    request_by = models.ForeignKey(
        User,
        models.DO_NOTHING,
        related_name='request_user',
        db_index=True,
    )
    processed_by = models.ForeignKey(
        User,
        models.DO_NOTHING,
        related_name='processed_user',
        null=True,
        blank=True,
        db_index=True,
    )
    created_at = models.DateField(default=datetime.date.today)

    class Meta:
        verbose_name = "Request"
        verbose_name_plural = "Requests"

    def __str__(self):
        return u"#{}: {}".format(self.id, self.title)
