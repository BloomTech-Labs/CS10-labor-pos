from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User

class Contractor(models.User):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, null=False)
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=70, null=False, blank=False, unique=True)
    address = models.TextField(blank=True, null=True, default='')
    business_name = models.CharField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=50, null=False, blank=False)
    security_question = models.TextField(blank=False, null=False)
    hashed_security_answer = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)