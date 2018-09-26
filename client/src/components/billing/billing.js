/* eslint-disable no-console */

import React, { Component } from "react";
import { withRouter } from "react-router";
import { StripeProvider, Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./checkoutform";
import "./billing.css";

//This component will render on the /billing route when the user is logged in
//It is a child of the home component.
//It presents the user with forms that allow them to PAY US MONEY!

//https://balsamiq.cloud/sc1hpyg/po5pcja/rE4AA

//StripeProvider gives us access to the Stripe Object
//i.e Stripe.createToken, stripe.elements() etc
//App loads the stripe script asynchronously in CDM

class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_publishable}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default withRouter(Billing);
