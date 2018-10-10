from django.db import models
from django.conf import settings
from decouple import config
import stripe

# Create your models here.


class Token(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.CharField(default="")
    livemode = models.BooleanField(default=False)
    type = models.CharField(default="")
    used = models.BooleanField(default=False)

    def __str__(self):
        return f"{id}"


class Charge(models.model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.CharField(default="")
    captured = models.BooleanField(default=False)
    created = models.CharField(default="")
    currency = models.CharField(default="")
    description = models.CharField(max_length=22, default="")
    status = models.CharField(default="")

    def __str__(self):
        return f"{status}"













