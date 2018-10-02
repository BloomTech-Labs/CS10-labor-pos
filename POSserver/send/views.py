from django.shortcuts import render
from django.core.mail import send_mail
from django.template.loader import get_template
from django.conf import settings
from post_office import mail
from django.http import HttpResponse, HttpResponseRedirect


def test_view(request):

    if request.method == "POST":
        name =  request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        subject = "testing"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [settings.DEFAULT_FROM_EMAIL]


        context = {
          "user": name,
          "email": email,
          "message": message
        }

        test_message = get_template("test_message.txt").render(context)
        send_mail(subject, test_message, from_email, to_email, fail_silently=True)


        return render (request, "sent.html", {})
    return HttpResponse(render(request, "sent.html", {}))


def sent(request):
    return HttpResponseRedirect(render(request, "sent.html", {}))