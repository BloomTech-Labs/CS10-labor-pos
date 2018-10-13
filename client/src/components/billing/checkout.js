import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { CREATE_STRIPE_CHARGE } from "../../mutations.js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  Grid
} from "@material-ui/core";
import { styles } from "../material-ui/styles.js";

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
`;

const query = gql`
  {
    currentUser {
      id
    }
  }
`;

class Checkout extends Component {
  state = {
    subscriptionType: "",
    subscriptionAmount: null
  };

  setSubscriptionType = e => {
    const { value: subscriptionType } = e.target;
    const subscriptionAmount = Number(e.target.attributes["price"]);

    this.setState({
      subscriptionType,
      subscriptionAmount
    });
  };

  getStripeToken = token => {
    const { subscriptionType } = this.state;

    let apiURI = "http://localhost:8000/graphql/";

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/graphql"
      },
      url: apiURI,
      data: { token, jwt: localStorage.getItem("token") },
      body: JSON.stringify({ query: "{ token: { id } }" })
    };

    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Card>
          <Typography paragraph>
            {"contractAlchemy provides two tiers of service, free and premium."}
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              "Free users have access to all features but a limit of 8 of each item at one time - 8 clients, 8 jobs, etc."
            }
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              "Premium users have access to all features with an unlimited number of jobs, clients, and so on. We offer our premium subscription at two different rates - a monthly fee of 99¢ or a yearly fee of $9.99."
            }
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              "Choose your rate to subscribe and begin using yor premium access!"
            }
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
            currency="USD"
            name="contractAlchemy"
            token={this.getStripeToken}
            stripeKey="pk_test_4kN2XG1xLysXr0GWDB07nt61"
            image="https://bestpos.netlify.com/goldraccoon.png"
            color="black"
            zipCode="true"
            billingAddress="true"
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Checkout;
