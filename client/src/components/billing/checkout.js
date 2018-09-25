import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  IbanElement,
  IdealBankElement,
  injectStripe
} from "react-stripe-elements";
import AddressSection from "./addresssection";
import CardSection from "./cardsection";

// Split Fields
// Note: we only register the CardNumberElement for split fields so that we have
// a unique Element to infer when calling `wrappedCreateToken` or `wrappedCreateSource`.

class Checkout extends Component {
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken({ name: "Jenny Rosen" }).then(({ token }) => {
      console.log("Received stripe token:", token);
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <CardNumberElement />
        <CardExpiryElement />
        <CardCVCElement />
        <PostalCodeElement />
        <IbanElement />
        <IdealBankElement />
        <AddressSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(Checkout);
