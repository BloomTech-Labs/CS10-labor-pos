from django.db import models
from uuid import uuid4


class Part(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    part_name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.part_name}"
