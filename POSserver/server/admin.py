from django.contrib import admin
from .models.account import Account
from .models.contractor import Contractor
from .models.job import Job
from .models.note import Note
from .models.part import Part
from .models.tag import Tag


# Register your models here.
class TagAdmin(admin.ModelAdmin):
    pass


class AccountAdmin(admin.ModelAdmin):
    pass


class ContractorAdmin(admin.ModelAdmin):
    pass


class NoteAdmin(admin.ModelAdmin):
    pass


class PartAdmin(admin.ModelAdmin):
    pass


class JobAdmin(admin.ModelAdmin):
    pass


admin.site.register(Tag, TagAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Account, AccountAdmin)
admin.site.register(Contractor, ContractorAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Part, PartAdmin)
