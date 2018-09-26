import React, { Component } from "react";
import { withRouter } from "react-router";
import { StripeProvider } from "react-stripe-elements";
import MyStoreCheckout from "./mystorecheckout";
import './billing.css';

//This component will render on the /billing route when the user is logged in
//It is a child of the home component.
//It presents the user with forms that allow them to PAY US MONEY!

//https://balsamiq.cloud/sc1hpyg/po5pcja/rE4AA

//StripeProvider gives us access to the Stripe Object
//i.e Stripe.createToken, stripe.elements() etc
//App loads the stripe script asynchronously in CDM

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = { stripe: "" };
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(process.env.REACT_APP_publishable)
      });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        //Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(process.env.REACT_APP_publishable)
        });
      });
    }
  }

  render() {
    return (
      this.state.stripe && (
        <StripeProvider stripe={this.state.stripe}>
          <MyStoreCheckout />
        </StripeProvider>
      )
    );
  }
}

export default withRouter(Billing);