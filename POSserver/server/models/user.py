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
            sg = sendgrid.SendGridAPIClient(api_key=config("SENDGRID_API_KEY"))
            from_email = Email("welcome@contractAlchemypos.com")
            to_email = Email(user_email)
            subject = "Welcome to contractAlchemy!"
            content = Content(
                "text/plain",
                "contractAlchemy is a tool that organizes your clients, jobs, parts, and invoices "
                "all in one convenient place.  The first step in using our application is to "
                "create a client.  Once you've done that, you can start to build out the jobs "
                "that fall under that client, adding any parts that contribute to that job."
                "Those parts are what's used in building out invoices for your customers.\n\n"
                "Premium users gain access to all of our features with an unlimited number of "
                "records.  Premium membership also includes the ability to select different "
                "themes for the website.\n\n"
                "Free membership includes access to all of our features (outside theme switching) "
                "for up to 6 records of a type at a given type (6 clients, 6 jobs, etc.).  You "
                "can upgrade to premium membership at any time in the billing section - monthly "
                "subscriptions are $0.99 per month and yearly subscriptions are $9.99.\n\n"
                "We hope this makes your life at least a little bit easier.\n\n"
                "Thank you for joining",
            )
            mail = Mail(from_email, to_email, subject, content)
            sg.client.mail.send.post(request_body=mail.get())
