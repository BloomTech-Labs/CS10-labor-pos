from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings

# from django.contrib.auth import get_user_model
from django.dispatch import receiver
from decouple import config
import sendgrid
from sendgrid.helpers.mail import Email, Content, Mail

# from django.http import HttpResponse, HttpResponseRedirect


if not settings.configured:
    settings.configure()


# extends django user model
class User(AbstractUser):
    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"
    # defines parameters for users, designates required fields, sets default values
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
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
    state = models.CharField(max_length=2, choices=state_choices)
    zipcode = models.CharField(max_length=10)
    business_name = models.CharField(max_length=100, null=True, blank=True, default="")
    modified_at = models.DateTimeField(auto_now=True)
    premium = models.BooleanField(default=False, blank=True, null=True)
    paid_until = models.DateTimeField(blank=True, null=True)

    # sets display name - only on admin panel
    def __str__(self):
        return f"{self.username} {self.first_name} {self.last_name}"

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    # sends welcome email once user is created
    def welcome_mail(sender, instance, **kwargs):
        if kwargs["created"]:
            user_email = instance.email
            sg = sendgrid.SendGridAPIClient(apikey=config("SENDGRID_API_KEY"))
            from_email = Email("nphillip78@gmail.com")
            to_email = Email(user_email)
            subject = "Welcome to contractAlchemy!"
            content = Content(
                "text/plain",
                "contractAlchemy is a tool that organizes your clients, jobs, parts, and invoices all in one place.\n\
                Premium users gain access to all of our features with an unlimited number of records.\n\
                Premium membership also includes the ability to select different themes for the website layout.\n\
                Our free membership includes access to all features for up to 6 records at a time - 6 clients, 6 jobs, and so on.\n\
                You can upgrade to premium at any time.",
            )
            mail = Mail(from_email, subject, to_email, content)
            sg.client.mail.send.post(request_body=mail.get())