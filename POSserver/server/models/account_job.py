# import uuid
# from django.db import models
# from .job import Job
# from .account import Account


# class Account_Job(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
#     job_id = models.ForeignKey(Job, on_delete=models.CASCADE)
