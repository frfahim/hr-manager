from django.db import transaction
from rest_framework.authtoken.models import Token

@transaction.atomic
def post_save_user(sender, instance, created, **kwarg):
    if created:
        Token.objects.create(user=instance)
