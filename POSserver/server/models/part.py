from django.db import models
from uuid import uuid4


class Part(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
