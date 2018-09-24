from django.contrib import admin
from server.models import Job, Note, Part, Tag, User, Client
from django.contrib.auth.admin import UserAdmin
from django.forms import ModelForm


class UserCreationForm(ModelForm):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "state",
            "zipcode",
            "business_name",
            "premium",
            "paid_until",
        )

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class CustomUserAdmin(UserAdmin):
    # The forms to add and change user instances
    add_form = UserCreationForm
    list_display = ("username", "first_name", "last_name", "premium", "paid_until")
    ordering = ("email",)

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password",
                    "first_name",
                    "last_name",
                    "street_address",
                    "city",
                    "state",
                    "zipcode",
                    "business_name",
                    "premium",
                    "paid_until",
                ),
            },
        ),
    )

    filter_horizontal = ()


admin.site.register(User, CustomUserAdmin)
admin.site.register(Tag)
admin.site.register(Job)
admin.site.register(Client)
admin.site.register(Note)
admin.site.register(Part)
