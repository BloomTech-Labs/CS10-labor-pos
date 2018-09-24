import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class StripeProvider extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_4kN2XG1xLysXr0GWDB07nt61">
        <div className="stripe">
          <h1>Subscribe</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeProvider;