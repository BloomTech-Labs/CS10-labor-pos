from post_office import mail
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
import os
# from sendgrid.helpers.mail import *

settings.configure()

def test_email():

    mail.send(
        ['nphillips78@gmail.com'], # List of email addresses also accepted
        'cole.mac.phillips@gmail.com.com',
        subject='My email',
        message='Hi there!',
        html_message='Hi <strong>there</strong>!',
        backend='ses',
)

"""
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
import os
# from sendgrid.helpers.mail import *
from django.template.loader import get_template

# settings.configure()


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

        test_message = get_template("sent.html").render(context)

        send_mail(subject, test_message, from_email, ["cole.mac.phillips@gmail.com"],fail_silently=False)

        print("Email sent")

        return("sent/")

    return render(request, "index.html", {})

def sent(request):
    return render(request, "sent.html", {})
"""


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
"""