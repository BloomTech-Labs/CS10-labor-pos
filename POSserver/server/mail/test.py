from django.core.mail import send_mail
from django.http import HttpResponse
from django.conf import settings
# from django.conf.urls import patterns, urls


def sendTestEmail(request, emailto):

    # parameters of sendmail(subject, body, from, [recipientlist])
    res = send_mail("testing", "Look it works!", "nphillips78@gmail.com", "cole.mac.phillips")
    return HttpResponse('%s'%res.)


urlpatterns = patterns('POSserver.views', url(r'^testemail/(?Pcole.mac.phillips@gmail.com[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/', 'sendTestEmail', name='sendSimpleEmail'),)