from django.db import models
from uuid import uuid4

class Account(models.Model):
    id = models.UUIDField(primary-key=True, default=uuid4, editable=False, null=False)
    business_name = models.CharField(max_length=100, null=False, blank=False)
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=70, null=False, blank=False)
    street_address = models.CharField(max_length=100, null=False, blank=False)
    city = models.CharField(max_length=70, null=False, blank=False)
    state_choices = (
        ('AL', 'Alabama'),
        ('AK', 'Alaska'),
        ('AZ', 'Arizona'),
        ('AR','Arkansas'),
        ('CA','California'),
        ('CO','Colorado'),
        ('CT','Connecticut'),
        ('DC','Distric of Columbia'),
        ('DE','Delaware'),
        ('FL','Florida'),
        ('GA','Georgia'),
        ('HI','Hawaii'),
        ('ID','Idaho'),
        ('IL','Illinois'),
        ('IN','Indiana'),
        ('IA','Iowa'),
        ('KS','Kansas'),
        ('KY','Kentucky'),
        ('LA','Louisiana'),
        ('ME','Maine'),
        ('MD','Maryland'),
        ('MA','Massachusettes'),
        ('MI','Michigan'),
        ('MN','Minnesota'),
        ('MS','Mississippi'),
        ('MO','Missouri'),
        ('MT','Montana'),
        ('NE','Nebraska'),
        ('NV','Nevada'),
        ('NH','New Hampshire'),
        ('NJ','New Jersey'),
        ('NM','New Mexico'),
        ('NY','New York'),
        ('NC','North Carolina'),
        ('ND','North Dakota'),
        ('OH','Ohio'),
        ('OK','Oklahoma'),
        ('OR','Oregon'),
        ('PA','Pennsylvania'),
        ('RI','Rhode Island'),
        ('SC','South Carolina'),
        ('SD','South Dakota'),
        ('TN','Tennessee'),
        ('TX','Texas'),
        ('UT','Utah'),
        ('VT','Vermont'),
        ('VA','Virginia'),
        ('WA','Washington'),
        ('WV','West Virginia'),
        ('WI','Wisconsin'),
        ('WY','Wyoming'),
        ('PR','Puerto Rico'),
        ('VI','Virgin Islands'),
        ('GU','Guam')
    )
    state = models.CharField(
        max_length=2,
        choices=state_choices,
        default=Alabama
    )
    zipcode = models.CharField(max_length=10, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False)
    modified_at = models.DateTimeField(auto_now=True, blank=False)
    deadline = models.DateField(blank=True, default='')
    notes = models.TextField(blank=True, default='')


