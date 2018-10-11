from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from decouple import config
import json
import stripe

stripe.api_key = config("STRIPE_SECRET_KEY")
stripe.log = 'info'


@require_http_methods(['POST'])
@csrf_exempt
def checkout(request):
    try:
        charge = stripe.Charge.create(
          amount=request.POST.get('amount', ''),
          currency=request.POST.get('currency', ''),
          source=request.POST.get('stripeToken', ''),
          description=request.POST.get('description', ''),
          statement_descriptor="contractAlchemy premium",
        )

        if charge['status'] == 'succeeded':
                return HttpResponse(json.dumps(
                    {'message': "Your transaction was successful."})
                    )
        else:
            raise stripe.error.CardError
    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get('error', {})
        print('Status is: %s' % e.http_status)
        print('Type is: %s' % err.get('type'))
        print('Code is: %s' % err.get('code'))
        print('Message is %s' % err.get('message'))
        return HttpResponse(
            json.dumps({"message": err.get('message')}),
            status=e.http_status
        )
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        return HttpResponse(json.dumps({
            'message': "The API was not able to respond, try again."
        }))
    except stripe.error.InvalidRequestError as e:
        # invalid parameters were supplied to Stripe's API
        return HttpResponse(json.dumps({
            'message': "Invalid parameters, unable to process payment."
        }))
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        pass
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        return HttpResponse(json.dumps({
            'message': 'Network communication failed, try again.'
        }))
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return HttpResponse(json.dumps({
            'message': 'Internal Error, contact support.'
        }))

    # Something else happened, completely unrelated to Stripe
    except Exception as e:
        return HttpResponse(json.dumps({
            'message': 'Unable to process payment, try again.'
        }))

# Add endpoint_secretkey here in localhost


endpoint_secret = settings.STRIPE_WEBHOOK_SECRET


"""
def my_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)
  except stripe.error.SignatureVerificationError as e:
    # Invalid signature
    return HttpResponse(status=400)

  # Do something with event

  return HttpResponse(status=200)
  """
 