from django.db import models


class Part(models.Model):
    job = models.ForeignKey("Job", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    cost = models.DecimalField(decimal_places=2, max_digits=5, null=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.name}"
