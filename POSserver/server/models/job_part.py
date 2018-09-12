# import uuid
# from django.db import models
# from .job import Job
# from .part import Part


# class Job_Part(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     part = models.ForeignKey(Part, on_delete=models.CASCADE)
#     job_id = models.ForeignKey(Job, on_delete=models.CASCADE)
