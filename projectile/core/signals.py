from rest_framework.authtoken.models import Token

def post_save_user(sender, instance, created, **kwarg):
    if created:
        Token.object.create(user=instance)
