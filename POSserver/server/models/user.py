from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator as email_validator
from django.contrib.auth.validators import UnicodeUsernameValidator


class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text=(
            "Required.  150 character limit.  Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={"unique": ("A user with that username already exists.")},
    )
    email = models.EmailField(blank=False, validators=[email_validator])
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    street_address = models.CharField(max_length=100)
    city = models.CharField(max_length=70)
    state_choices = (
        ("AL", "Alabama"),
        ("AK", "Alaska"),
        ("AZ", "Arizona"),
        ("AR", "Arkansas"),
        ("CA", "California"),
        ("CO", "Colorado"),
        ("CT", "Connecticut"),
        ("DC", "District of Columbia"),
        ("DE", "Delaware"),
        ("FL", "Florida"),
        ("GA", "Georgia"),
        ("HI", "Hawaii"),
        ("ID", "Idaho"),
        ("IL", "Illinois"),
        ("IN", "Indiana"),
        ("IA", "Iowa"),
        ("KS", "Kansas"),
        ("KY", "Kentucky"),
        ("LA", "Louisiana"),
        ("ME", "Maine"),
        ("MD", "Maryland"),
        ("MA", "Massachusetts"),
        ("MI", "Michigan"),
        ("MN", "Minnesota"),
        ("MS", "Mississippi"),
        ("MO", "Missouri"),
        ("MT", "Montana"),
        ("NE", "Nebraska"),
        ("NV", "Nevada"),
        ("NH", "New Hampshire"),
        ("NJ", "New Jersey"),
        ("NM", "New Mexico"),
        ("NY", "New York"),
        ("NC", "North Carolina"),
        ("ND", "North Dakota"),
        ("OH", "Ohio"),
        ("OK", "Oklahoma"),
        ("OR", "Oregon"),
        ("PA", "Pennsylvania"),
        ("RI", "Rhode Island"),
        ("SC", "South Carolina"),
        ("SD", "South Dakota"),
        ("TN", "Tennessee"),
        ("TX", "Texas"),
        ("UT", "Utah"),
        ("VT", "Vermont"),
        ("VA", "Virginia"),
        ("WA", "Washington"),
        ("WV", "West Virginia"),
        ("WI", "Wisconsin"),
        ("WY", "Wyoming"),
        ("PR", "Puerto Rico"),
        ("VI", "Virgin Islands"),
        ("GU", "Guam"),
    )
    state = models.CharField(max_length=50, choices=state_choices, default="Alabama")
    zipcode = models.CharField(max_length=10)
    business_name = models.CharField(max_length=100, null=True, blank=True, default="")
    date_joined = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(auto_now=True)
    premium = models.BooleanField(default=False, blank=True, null=True)
    paid_until = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} {self.first_name} {self.last_name}"
