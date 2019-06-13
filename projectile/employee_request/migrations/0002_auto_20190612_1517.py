# Generated by Django 2.2.2 on 2019-06-12 15:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employee_request', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='employeerequest',
            options={'verbose_name': 'Request', 'verbose_name_plural': 'Requests'},
        ),
        migrations.AlterField(
            model_name='employeerequest',
            name='processed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='processed_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
