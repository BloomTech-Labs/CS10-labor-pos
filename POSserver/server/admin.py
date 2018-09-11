from django.contrib import admin
from .models import Tag, Job_Note, Account_Job


# Register your models here.
class Tag_Admin(admin.ModelAdmin):
    pass


class Job_Note_Admin(admin.ModelAdmin):
    pass


class Account_Job_Admin(admin.ModelAdmin):
    pass


admin.site.register(Tag, Tag_Admin)
admin.site.register(Job_Note, Job_Note_Admin)
admin.site.register(Account_Job, Account_Job_Admin)

