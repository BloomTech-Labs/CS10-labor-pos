import React, { Component } from "react";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import Checkout from "./checkout";

class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <Elements>
          <Checkout />
        </Elements>
      </StripeProvider>
    );
  }
}

export default injectStripe(Billing);
