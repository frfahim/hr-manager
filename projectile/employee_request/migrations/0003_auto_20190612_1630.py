# Generated by Django 2.2.2 on 2019-06-12 16:30

from django.db import migrations, models
import employee_request.enums


class Migration(migrations.Migration):

    dependencies = [
        ('employee_request', '0002_auto_20190612_1517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeerequest',
            name='request_status',
            field=models.IntegerField(choices=[(1, 'Open'), (2, 'Reviewed'), (3, 'Processed')], default=employee_request.enums.RequestStatus(1)),
        ),
    ]
