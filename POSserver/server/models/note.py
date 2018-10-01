from django.db import models
from django.conf import settings

# from .client import Client
# from .job import Job


class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, null=True, blank=True
    )
    job = models.ForeignKey("Job", on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.title} "
