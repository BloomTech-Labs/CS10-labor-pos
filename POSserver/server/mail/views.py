from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render


def test_email(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        subject = "Welcome to contractAlchemy!"
        from_email = settings.EMAIL_HOST_USER
        to_email = [settings.EMAIL_HOST_USER]

        # first way to send email
        # test_message = "{0}", from {1} with email{2}".format(message, name, email)

        # second way to send email

        message = "hi"
        context = {
          'user': name,
          'email': email,
          'message': message
        }
    
        test_message = render(context)

        send_mail(subject, test_message, from_email, to_email, fail_silently=True)
        # change to false in production

    print("Email sent")
