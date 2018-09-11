from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from .account import Account

class Account_Note(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField(blank=True)
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

