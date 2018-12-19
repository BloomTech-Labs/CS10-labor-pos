import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class StripeProvider extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_VFg2TxWkoz0c2FsJlupSqTsl">
        <div className="stripe">
          <h1>Payment</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeProvider;
