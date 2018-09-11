from django.contrib import admin
from .models import Tag, Job_Note


# Register your models here.
class Tag_Admin(admin.ModelAdmin):
    pass


class Job_Note_Admin(admin.ModelAdmin):
    pass


admin.site.register(Tag, Tag_Admin)
admin.site.register(Job_Note, Job_Note_Admin)
