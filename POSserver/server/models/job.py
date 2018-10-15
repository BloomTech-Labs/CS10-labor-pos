from django.db import models
from django.conf import settings
from ..models import Client


# defines paramaters for jobs, designates required fields, sets default values
class Job(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    complete = models.BooleanField(default=False)
    labor = models.DecimalField(decimal_places=2, max_digits=5, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True, null=True)

    # sets display name - only on admin panel
    def __str__(self):
        return f"{self.name}"
