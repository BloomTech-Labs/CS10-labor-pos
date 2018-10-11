import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { CREATE_STRIPE_CHARGE } from "../../mutations.js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Radio } from "@material-ui/core";


const mutation = gql`
   mutation CreateStripeCharge($input: _CreateStripeChargeInput!) {
  createStripeCharge(input: $input) {
    charge {
      id
      amount
      captured
      created
      currency
      description
      status
    }
  }
}
`

const query = gql`
{
  currentUser {
    id
  }
}
`

class Checkout extends Component {
  state = {
    subscriptionType: '',
    subscriptionAmount: null
  }

  setSubscriptionType = e => {
    const { value: subscriptionType } = e.target 
    const subscriptionAmount = Number(e.target.attributes['price'])
    console.log(e)

    this.setState({
      subscriptionType,
      subscriptionAmount
    })
  }

  getStripeToken = token =>  {
    const { subscriptionType } = this.state

    let apiURI = "http://127.0.0.1:8000/graphql/"
    
    const request = {
      method: 'POST',
      url: apiURI,
      data: { token, jwt: localStorage.getItem('token') }
    }

    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render () {
    return(
      <React.Fragment>
        <Radio
        price={999}
        label="Yearly Subscription - $9.99"
        name="subscription"
        onClick={this.setSubscriptionType}
        value="yearly"
        type="radio"
        />

        <Radio
        price={99}
        label="Monthly Subscription -$.99"
        name="subscription"
        onClick={this.setSubscriptionType}
        value="monthly"
        type="radio"
        />
        <StripeCheckout
          amount={this.state.subscriptionAmount}
          currency='USD'
          name="contractAlchemy"
          token={this.getStripeToken}
          stripeKey="pk_test_4kN2XG1xLysXr0GWDB07nt61"
          image="https://bestpos.netlify.com/goldraccoon.png"
          color="black"
          zipCode="true"
          billingAddress="true"
          />
          </React.Fragment>
    )
  }
}

export default Checkout;