from django.db import models
<<<<<<< HEAD

# from .tag import Tag
from .note import Note
from .part import Part
=======
from uuid import uuid4
>>>>>>> 09626749283b142f78435a1b231c49f8529e9fe0
from django.conf import settings
from .client import Client


class Job(models.Model):
<<<<<<< HEAD
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tag = models.ForeignKey(
        "server.Tag", on_delete=models.CASCADE, blank=True, null=True
    )
=======
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
>>>>>>> 09626749283b142f78435a1b231c49f8529e9fe0
    name = models.CharField(max_length=200)
    complete = models.BooleanField(default=False)
    labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.name}"
