# Generated by Django 2.2.2 on 2019-06-12 14:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import employee_request.enums


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EmployeeRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True, null=True)),
                ('request_status', models.CharField(choices=[(1, 'Open'), (2, 'Close'), (3, 'Reviewed'), (4, 'Processed')], default=employee_request.enums.RequestStatus(1), max_length=2)),
                ('processed_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='processed_user', to=settings.AUTH_USER_MODEL)),
                ('request_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='request_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Employee Request',
                'verbose_name_plural': 'Employee Requests',
            },
        ),
    ]
