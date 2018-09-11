from django.db import models
from .tag import Tag
from .contractor import Contractor
from uuid import uuid4


class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    contractor_id = models.ForeignKey(Contractor, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    notes = models.TextField(blank=True)
    complete = models.BooleanField(default=False)
    labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True)
