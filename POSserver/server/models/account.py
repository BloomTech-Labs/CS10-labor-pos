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
        ('AZ',)
    )
    zipcode = 
    created_at = models.DateTime
    modified_at =
    deadline = 


Account
contractor id r
tag id r
name r
email char field r emailField
address r
zipcode r
notes - textfield o
created at r
modified at r
deadline - datetimefield o
select account where contractor id = x select account where job id = x