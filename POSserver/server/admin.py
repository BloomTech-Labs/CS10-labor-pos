from django.contrib import admin
from .models.client import Client
from .models.user import User
from .models.job import Job
from .models.note import Note
from .models.part import Part
from .models.tag import Tag


admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Job)
admin.site.register(Client)
admin.site.register(Note)
admin.site.register(Part)
