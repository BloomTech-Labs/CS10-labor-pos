from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render

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

send_mail("testing", "please let this work", "nphillips78@gmail.com", ["cole.mac.phillips@gmail.com"], fail_silently=True)

print("Email sent")
