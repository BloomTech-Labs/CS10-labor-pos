from django.db import models
from .note import Note
from .job import Job
from .contractor import Contractor
from uuid import uuid4


class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, null=False)
    contractor_id = models.ForeignKey(Contractor, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=100, null=True, blank=True, default="")
    first_name = models.CharField(max_length=100, null=False, blank=False, default="")
    last_name = models.CharField(max_length=100, null=False, blank=False, default="")
    email = models.EmailField(max_length=70, null=False, blank=False, default="")
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
        ("DC", "Distric of Columbia"),
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
        ("MA", "Massachusettes"),
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
    state = models.CharField(max_length=2, choices=state_choices, default="Alabama")
    zipcode = models.CharField(max_length=10, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True, default="")
    # notes = models.TextField(blank=True, default="")
    note = models.ManyToManyField(Note, related_name="account_notes")
    job = models.ManyToManyField(Job, related_name="account_jobs")
