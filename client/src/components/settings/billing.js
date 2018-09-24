import React, { Component } from "react";
import { withRouter } from "react-router";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutform';

//This component will render on the /billing route when the user is logged in
//It is a child of the home component.
//It presents the user with forms that allow them to PAY US MONEY!

//https://balsamiq.cloud/sc1hpyg/po5pcja/rE4AA
class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_4kN2XG1xLysXr0GWDB07nt61">
        <div className="stripe">
          <h1>Subscribe to access premium content!</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default withRouter(Billing);
