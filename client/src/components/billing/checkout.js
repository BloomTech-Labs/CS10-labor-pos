import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { CREATE_STRIPE_CHARGE } from "../../mutations.js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { FormControlLabel, Checkbox, Typography, Card, Grid } from "@material-ui/core";
import { styles } from "../material-ui/styles.js";
import { AUTH_TOKEN } from "../../constants";



/*const mutation = gql`
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
*/

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

  handleSubmit= e => {
    e.preventDefault();
    this.setState({ card_errors: "", resp_message: "" });
    /*
    Within the context of Elements, this call to createToken knows which
    Element to tokenize, since there's only one in this group.
    */
    return this.props.stripe
      .createToken({ type: "card", name: " " })
      .then(result => {
        if (result.error) {
          console.log("THERE IS AN ERROR IN YOUR FORM", result.error);
          return this.setState({ card_errors: result.error.message });
        } else {
          console.log(
            "Received Stripe token ---> SENDING TO SERVER: ",
            result.token
          );
          let formData = new FormData();
          formData.append("description", "Premium");
          formData.append("currency", "usd");
          formData.append("amount", 9999);
          formData.append("source", result.token.id);
          return fetch("https://bestpos.netlify.com/createcharge/", {
            method: "POST",
            headers: {
              accept: "application/graphql"
            },
            body: formData
          })
            .then(resp => resp.json())
            .then(json => this.setState({ resp_message: json.message }));
        }
      });
  };

  render () {
    return(
      <div>
      <Card>
       <Typography paragraph>
                {"contractAlchemy provides two tiers of service, free and premium."}
        </Typography>
              </Card>
              <Grid container className="subs">
              <Grid item xs={6}>
                <Typography align="center">
                  { "Free users have access to all features but a limit of 8 of each item at one time - 8 clients, 8 jobs, etc."}
                  </Typography>
              </Grid>
              <Card>
                <Typography paragraph>
                {"Premium users have access to all features with an unlimited number of jobs, clients, and so on. We offer our premium subscription at two different rates - a monthly fee of 99¢ or a yearly fee of $9.99."} 
                </Typography>
                </Card>
                </Grid>
                <Card>
                  <Typography paragraph>
                 {"Choose your rate to subscribe and begin using your premium access!"}
                 </Typography>
                </Card> 

      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              price={999}
              name="subscription"
              onClick={this.setSubscriptionType}
              value="yearly"
              type="radio"
              color="secondary"
            />
          }
           label="Yearly Subscription - $9.99"
          />
        <FormControlLabel
          control={
          <Checkbox
            price={99}
            name="subscription"
            onClick={this.setSubscriptionType}
            value="monthly"
            type="radio"
            color="secondary"
            />
          }
          label="Monthly Subscription - 99¢"
          />
         
        <StripeCheckout
          amount={this.state.subscriptionAmount}
          currency='USD'
          name="contractAlchemy"
          stripeToken={this.getStripeToken}
          stripeKey="pk_test_4kN2XG1xLysXr0GWDB07nt61"
          image="https://bestpos.netlify.com/goldraccoon.png"
          color="black"
          zipCode="true"
          billingAddress="true"
          />
          </React.Fragment>
     </div>
    )
  }
}

export default Checkout;