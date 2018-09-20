from django.db import models
from uuid import uuid4
from .client import Client


class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    complete = models.BooleanField(default=False)
    labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.name}"
