from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
import sendgrid
import os
from sendgrid.helpers.mail import *

settings.configure()

"""
def test_email(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        subject = "Welcome to contractAlchemy!"
        from_email = settings.EMAIL_HOST_USER
        to_email = [settings.EMAIL_HOST_USER]

      
        context = {
          'user': name,
          'email': email,
          'message': message
        }

        test_message = render(context)
        """
"""
send_mail("testing", "please let this work", "nphillips78@gmail.com", ["cole.mac.phillips@gmail.com"], fail_silently=True)

print("Email sent")
"""


sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
from_email = Email("test@example.com")
to_email = Email("test@example.com")
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere, even with Python")
mail = Mail(from_email, subject, to_email, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
