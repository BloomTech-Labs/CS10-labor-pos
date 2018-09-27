import json
import stripe
import sendgrid

from decouple import config
from sendgrid.helpers.mail import *
from django.http import HttpResponse, JsonResponse


"""
def monthly_sub(req):

    if req.method == "POST":
        stripe.api_key = process.env.REACT_APP_publishable,

    token = request.POST['stripeToken']

    charge = stripe.Charge.create(
        amount=99,
        currency="usd",
        source=token,
        description="contractAlchemy subscription",
         )

    return JsonResponse({
      "statusText": "OK",
      "statusCode": 200
     })

    return JsonResponse({"error": "An error occurred while processing payment"})

    return JsonResponse({"token": utf8_jwt})
"""

def make_payments(req):

    if req.method == "POST":
        stripe.api_key = config("STRIPE_SECRET_KEY")

    token = request.POST['stripeToken']

    charge = stripe.Charge.create(
        amount=99,
        currency="usd",
        source=token,
        description="contractAlchemy subscription",
         )

    return JsonResponse({
      "statusText": "OK",
      "statusCode": 200
     })

    return JsonResponse({"error": "An error occurred while processing payment"})

    return JsonResponse({"token": utf8_jwt})

sg = sendgrid.SendGridAPICLIENT(apikey=os.environ.get('SENDGRID_API_KEY'))
from_email = Email('test@example.com')
to_email = Email('test@example.com')
subject = 'Sendgrid Test'
content = Content(
    'text/plain'
    'Testing testing'
)
mail = Mail(from_email, to_email, content)
response = sg.client.mail.send.post(request.body=mail.get())

return HttpResponse('Email Sent')
