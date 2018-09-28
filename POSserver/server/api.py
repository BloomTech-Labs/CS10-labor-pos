import json
import stripe


from decouple import config
from django.http import HttpResponse, JsonResponse


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

  
