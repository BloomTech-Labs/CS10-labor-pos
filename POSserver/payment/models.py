from django.db import models
from django.conf import settings
from decouple import config
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id
import stripe

# Create your models here.


class Token(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.CharField(default="", max_length=100)
    livemode = models.BooleanField(default=False)
    type = models.CharField(default="", max_length=25)
    used = models.BooleanField(default=False)

    def __str__(self):
        return f"{id}"


class Charge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.CharField(default="", max_length=10)
    captured = models.BooleanField(default=False)
    created = models.CharField(default="", max_length=100)
    currency = models.CharField(default="", max_length=5)
    description = models.CharField(max_length=22, default="")
    status = models.CharField(default="", max_length=20)

    def __str__(self):
        return f"{status}"















