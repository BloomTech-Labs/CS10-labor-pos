import uuid
from django.db import models
from .job import Job


class Job_Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    body = models.TextField(blank=True)
    jobs = models.ManyToManyField(Job)
