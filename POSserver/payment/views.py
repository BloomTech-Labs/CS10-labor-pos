from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from decouple import config
import stripe

stripe.api_key = config("STRIPE_KEY")
stripe.log = "info"


@require_http_methods(["POST"])
@csrf_exempt
def checkout(request):
    try:
        customer = stripe.Customer.create(
            email=request.POST.get("email", ""),
            source=request.POST.get("source", ""),
            description=request.POST.get("description", ""),
        )

        subscription = stripe.Subscription.create(
            customer=customer, items=[{"plan": request.POST.get("description", "")}]
        )
        print("____STATUS____", subscription["status"])
        if subscription["status"] == "active":
            return JsonResponse({"message": "Your transaction was successful."})
        else:
            raise stripe.error.CardError
    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get("error", {})
        print("Status is: %s" % e.http_status)
        print("Type is: %s" % err.get("type"))
        print("Code is: %s" % err.get("code"))
        print("Message is %s" % err.get("message"))
        return JsonResponse({"message": err.get("message")}, status=e.http_status)
    except stripe.error.RateLimitError:
        # Too many requests made to the API too quickly
        return JsonResponse({"message": "The API was not able to respond, try again."})
    except stripe.error.InvalidRequestError:
        # invalid parameters were supplied to Stripe's API
        return JsonResponse(
            {"message": "Invalid parameters, unable to process payment."}
        )
    except stripe.error.AuthenticationError:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        pass
    except stripe.error.APIConnectionError:
        # Network communication with Stripe failed
        return JsonResponse({"message": "Network communication failed, try again."})
    except stripe.error.StripeError:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return JsonResponse({"message": "Internal Error, contact support."})
