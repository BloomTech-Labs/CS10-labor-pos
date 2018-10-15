import json
import stripe
from server.models.user import User

# lays out plan parameters
class CreateSubscription:
    def __init__(self, stripe_secret_key, body, plan, sub):
        self.stripe_secret_key = stripe_secret_key
        self.body = body
        self.plan = plan
        self.sub = sub
        self.id = None
        self.email = None
        self.customer = None
        self.User = None

    def set_api_key(self):
        stripe.api_key = self.stripe_secret_key

    def get_user(self):
        self.set_api_key()
        self.User = User.objects.get(UserId=id)

        return self.User

    # checks for existing customer
    def check_if_customer_exists(self):
        user = self.get_user()
        customerId = user.CustomerId

        try:
            stripe.Customer.retrieve(id=customerId)['subscriptions']['data']
            return True

        except ValueError:
            return False

    def parse_body(self):
        self.body = json.loads(self.body.decode('utf-8'))
        self.id = self.body['token']['id']
        self.email = self.body['token']['email']

    # creates Stripe customer, allowing us to charge automatically later
    def create_customer(self):
        self.customer = stripe.Customer.create(
          email=self.email,
          source=self.id
        )
    # updates user with Stripe customer id and subscription info
    def update_User(self):
        self.create_customer()
        self.User.CustomerId = self.customer.id
        self.User.Subscription = self.sub
        print(self.User.CustomerId)
        self.User.save(update_fields=['CustomerId'])

    def create_subscription(self):
        self.update_user()

        stripe.Subscription.create(
            customer=self.customer.id,
            items=[{'plan': self.plan}]
        )
