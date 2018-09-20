from django.db import models
from uuid import uuid4
from django.conf import settings


class Client(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=100, null=True, blank=True, default="")
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100, default="")
    email = models.EmailField(max_length=70, default="")
    street_number = models.CharField(max_length=10, default="")
    unit_number = models.CharField(max_length=10, null=True, blank=True, default="")
    street_name = models.CharField(max_length=100, default="")
    city = models.CharField(max_length=70, default="")
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
    state = models.CharField(max_length=2, choices=state_choices, default="Alabama")
    zipcode = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(blank=True, null=True)

    def __str__(self):
        if self.business_name is not None:
            name = self.business_name
        else:
            name = self.first_name + " " + self.last_name
        return f"{self.__class__.__name__}: {name} "
