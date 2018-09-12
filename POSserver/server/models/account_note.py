# from django.db import models
# from uuid import uuid4
# from .account import Account
# from .note import Note


# class Account_Note(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
#     # title = models.CharField(max_length=200)
#     # body = models.TextField(blank=True)
#     account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
#     note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
