from django.db import models
from uuid import uuid4

# from .client import Client
# from .job import Job


class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    client = models.ForeignKey("Client", on_delete=models.CASCADE)
    job = models.ForeignKey("Job", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.title} "
