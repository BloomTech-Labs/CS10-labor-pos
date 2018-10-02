"""
"from django.shortcuts import render
from django.core.mail import send_mail
from django.template.loader import get_template
from django.conf import settings
from post_office import mail
from django.http import HttpResponse, HttpResponseRedirect

settings.configure()

def test_view(request):

    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        subject = "testing"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = ["cole.mac.phillips@gmail.com"]
         
        context = {
          "user": name,
          "email": email,
          "message": message
        }

        test_message = get_template("test_message.txt").render(context)
        send_mail(subject, test_message, from_email, to_email, fail_silently=True)

        print(subject, test_message, from_email, to_email,)


        return render (request, "sent.html", {})
    return HttpResponse(render(request, "sent.html", {}))


def sent(request):
    return HttpResponseRedirect(render(request, "sent.html", {}))
    """

import sendgrid
import os
from sendgrid.helpers.mail import *
from django.conf import settings
from decouple import config

sg = sendgrid.SendGridAPIClient(apikey=config("SENDGRID_API_KEY"))
from_email = Email("nphillip78@gmail.com")
to_email = Email("cole.mac.phillips@gmail.com")
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere, even with Python")
mail = Mail(from_email, subject, to_email, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
