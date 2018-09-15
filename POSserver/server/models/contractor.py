from django.db import models
from django.utils import timezone
from django.conf import settings
from uuid import uuid4

# class Contractor(models.User):
#     id = models.UUIDField(primary_key=True, default=uuid4, editable=False, null=False)
#     first_name = models.CharField(max_length=30, null=False, blank=False)
#     last_name = models.CharField(max_length=30, null=False, blank=False)
#     email = models.EmailField(max_length=70, null=False, blank=False, unique=True)
#     address = models.TextField(blank=True, null=True, default='')
#     business_name = models.CharField(max_length=100, null=False, blank=False)
#     password = models.CharField(max_length=50, null=False, blank=False)
#     security_question = models.TextField(blank=False, null=False)
#     hashed_security_answer = models.TextField(blank=False, null=False)
#     created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)
#     modified_at = models.DateTimeField(auto_now=True, blank=False, null=False)
#     premium = models.BooleanField(default=False, blank=False, null=False)
#     paid_until = DateTimeField(default=timezone.now, blank=True, null=True)


class Contractor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=70, null=False, blank=False, unique=True)
    street_address = models.CharField(max_length=100, null=False, blank=False)
    city = models.CharField(max_length=70, null=False, blank=False, default="")
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
    zipcode = models.CharField(max_length=10, null=False, blank=False)
    business_name = models.CharField(max_length=100, null=False, blank=False)
    # password = models.CharField(max_length=50, null=False, blank=False)
    # security_question = models.TextField(blank=False, null=False)
    # hashed_security_answer = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    modified_at = models.DateTimeField(auto_now=True, blank=False, null=False)
    premium = models.BooleanField(default=False, blank=False, null=False)
    paid_until = models.DateTimeField(default=timezone.now, blank=True, null=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.first_name} {self.last_name}"
