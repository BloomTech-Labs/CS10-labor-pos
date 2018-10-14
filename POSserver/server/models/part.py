from django.db import models
from django.conf import settings


class Part(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey("Job", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(decimal_places=2, max_digits=15)

    def __str__(self):
        return f"{self.name}"
