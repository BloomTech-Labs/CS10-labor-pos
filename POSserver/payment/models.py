from django.db import models
from django.conf import settings
from decouple import config
import stripe

# Create your models here.


class Token(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # created = models.CharField()
    livemode = models.BooleanField(default=False)
    # type = models.CharField()
    used = models.BooleanField(default=False)

    def __str__(self):
        return f"{id}"


class Charge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
