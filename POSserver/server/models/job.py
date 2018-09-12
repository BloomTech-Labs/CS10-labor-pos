from django.db import models

# from .tag import Tag
# from .note import Note
# from .part import Part
from uuid import uuid4


class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    contractor = models.ForeignKey("server.Contractor", on_delete=models.CASCADE)
    tag = models.ForeignKey("server.Tag", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    # note = models.ManyToManyField(Note, related_name="job_notes")
    # part = models.ManyToManyField(Part, related_name="job_parts")
    complete = models.BooleanField(default=False)
    labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True)
