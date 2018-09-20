from django.db import models
from uuid import uuid4
from django.conf import settings
from .job import Job


class Part(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    part_name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(decimal_places=2, max_digits=5, null=True)
     
    def __str__(self):
        return f"{self.__class__.__name__}: {self.part_name}"
