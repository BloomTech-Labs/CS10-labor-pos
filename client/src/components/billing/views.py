from django.shortcuts import render
import stripe
# Create your views here.
from django.views.generic.base import TemplateView
from django.conf import settings
from decouple import config


stripe.api_key = config('STRIPE_SECRET_KEY')

class HomePageView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs): 
        context = super().get_context_data(**kwargs)
        context['key'] = config('STRIPE_PUBLISHABLE_KEY')
        return context

def monthly_charge(request): 
    if request.method == 'POST':
        charge = stripe.Charge.create(
            amount=99,
            currency='usd',
            name='contractAlchemy',
            zipcode=True,
            billing_address=True,
            description='Monthly subscription',
            source=request.POST['stripeToken']
        )
        return render(request, 'charge.html') 


def monthly_charge(request): 
    if request.method == 'POST':
        charge = stripe.Charge.create(
            image='goldracoon.png'
            amount=99,
            currency='usd',
            name='contractAlchemy',
            zipcode=True,
            billing_address=True,
            description='Monthly subscription',
            source=request.POST['stripeToken']
        )
        return render(request, 'charge.html') 

def yearly_charge(request): 
    if request.method == 'POST':
        charge = stripe.Charge.create(
            image='goldracoon.png'
            amount=99,
            currency='usd',
            name='contractAlchemy',
            zipcode=True,
            billing_address=True,
            description='Monthly subscription',
            source=request.POST['stripeToken']
        )
        return render(request, 'charge.html')
