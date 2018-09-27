from django.contrib import admin
from server.models import Job, Note, Part, Tag, Client, User


admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Job)
admin.site.register(Client)
admin.site.register(Note)
admin.site.register(Part)
