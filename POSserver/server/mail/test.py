from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

send_mail("Test", "This is a simple text email body.", "Franz Fernando <ffernando@engineer.com>", ["nphillips78@gmail.com"])

mail.send()