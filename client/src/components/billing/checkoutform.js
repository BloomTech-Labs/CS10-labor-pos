/* eslint-disable no-console */
import React, { Component } from "react";
import "./billing.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stripeLoading: true
    };
    // onStripeUpdate must be bound or else clicking on button will produce error.
    this.monthlyMembership = this.monthlyMembership.bind(this);
    this.yearlyMembership = this.yearlyMembership.bind(this);
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this);
  }

  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement("script");
      script.onload = function() {
        console.info("Stripe script loaded");
        onload();
      };
      script.src = "https://checkout.stripe.com/checkout.js";
      document.head.appendChild(script);
    } else {
      onload();
    }
  }

  componentDidMount() {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: process.env.REACT_APP_publishable,
        image: "goldraccoon.png",
        amount: 99,
        name: "contractAlchemy",
        zipCode: "true",
        billingAddress: "true",
        locale: "auto",
        token: token => {
          this.setState({
            loading: true,
            token
          });

          // use fetch or some other AJAX library here if you dont want to use axios
          fetch("http://localhost:8000/graphql/", {
            method: "post",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=utf-8",
              Accept: "application/json"
            },
            body: JSON.stringify({
              stripeToken: token.id
            })
          });
        }
      });

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      });
    });
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close();
    }
  }

  yearlyMembership(e) {
    this.stripeHandler.open({
      image: "goldraccoon.png",
      amount: 999,
      name: "contractAlchemy",
      description: "Yearly Premium Subscription",
      zipCode: "true",
      billingAddress: "true",
      locale: "auto",
      panelLabel: "Buy Yearly Subscription",
      allowRememberMe: false,
      testOnlyUseMobileAlerts: false
    });
    e.preventDefault();
  }

  monthlyMembership(e) {
    this.stripeHandler.open({
      image: "goldraccoon.png",
      amount: "999",
      name: "contractAlchemy",
      description: "One Month Membership",
      zip_code: "true",
      billing_address: "true",
      locale: "auto",
      panelLabel: "Buy One Month Membership",
      allowRememberMe: false
    });
    e.preventDefault();
  }

  render() {
    const { stripeLoading, loading } = this.state;
    return (
      <div>
        {loading || stripeLoading ? (
          <p>loading..</p>
        ) : (
          <div>
            <button
              onClick={this.setSubscriptionType}
              value="yearly_subscription"
            >
              Purchase Yearly Subscription
            </button>
            <button
              onClick={this.setSubscriptionType}
              value="monthly_subscription"
            >
              Purchase One Month Membership
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CheckoutForm;
