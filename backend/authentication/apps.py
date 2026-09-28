from django.apps import AppConfig
from django.db.models.signals import post_save

class AuthenticationConfig(AppConfig):
    name = 'authentication'

    def ready(self):
        from django.contrib.auth.models import User
        from .models import create_user_profile
        post_save.connect(create_user_profile, sender=User)
