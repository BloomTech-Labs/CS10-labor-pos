"""
from django.core.mail import send_mail
from django.http import HttpResponse
from django.conf import settings
from django.urls import patterns, urls


def sendTestEmail(request, emailto):

    # parameters of sendmail(subject, body, from, [recipientlist])
    res = send_mail("testing", "Look it works!", "nphillips78@gmail.com", "cole.mac.phillips@gmail.com")
    return HttpResponse('%s'%res)


urlpatterns = patterns('POSserver.views', url(r'^testemail/(?Pcole.mac.phillips@gmail.com[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/', 'sendTestEmail', name='sendSimpleEmail'),)
"""
"""
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
import os


def sendemail(request):
    if request.method == 'POST':
        try:
            subject = request.POST.get('subject')
            message = request.POST.get('message')
            from_email = request.POST.get('sender')

            send_mail(subject, message, from_email, recipient, fail_silently=False)

        except BadHeaderError:
            return HttpResponse('Invalid header found.')

            return HttpResponseRedirect('/thanks/')

        print(response.status_code)
        print(response.body)
        print(response.headers)
"""