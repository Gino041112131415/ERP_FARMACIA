# core/user/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.forms import model_to_dict


class User(AbstractUser):
    image = models.ImageField(upload_to='users/%Y/%m/%d', null=True, blank=True)

    def get_image(self):
        if self.image:
            return f'{settings.MEDIA_URL}{self.image}'
        return f'{settings.STATIC_URL}img/usuario.png'

    def toJSON(self):
        item = model_to_dict(
            self,
            exclude=['password', 'user_permissions', 'groups']
        )
        item['image'] = self.get_image()
        item['date_joined'] = self.date_joined.strftime('%Y-%m-%d')
        return item
