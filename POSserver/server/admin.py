from django.contrib import admin
from .models.account import Account
from .models.contractor import Contractor
from .models.job import Job
from .models.note import Note
from .models.part import Part
from .models.tag import Tag


admin.site.register(Tag)
admin.site.register(Job)
admin.site.register(Account)
admin.site.register(Contractor)
admin.site.register(Note)
admin.site.register(Part)
