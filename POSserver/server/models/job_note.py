# import uuid
# from django.db import models
# from .job import Job
# from .note import Note


# class Job_Note(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
#     job_id = models.ForeignKey(Job, on_delete=models.CASCADE)
#     # body = models.TextField(blank=True)
#     # jobs = models.ManyToManyField(Job)
