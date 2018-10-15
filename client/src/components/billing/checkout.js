import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Card
} from "@material-ui/core";
import { AUTH_TOKEN } from "../../constants.js";

class Checkout extends Component {
  state = {
    subscriptionType: '',
    subscriptionAmount: null
  };

  // users will choose either the monthly or yearly subscription
  setSubscriptionType = e => {
    const { value: subscriptionType } = e.target;
    const subscriptionAmount = Number(e.target.attributes['price']);

    this.setState({
      subscriptionType,
      subscriptionAmount
    });
  };

  getStripeToken = token => {
    axios({
      url: process.env.REACT_APP_ENDPOINT,
      method: "post",
      headers: {
        Authorization: "JWT " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/graphql"
      },
      data: JSON.stringify({
        operationName: null,
        query: `mutation CreateCardToken($input: _CreateStripeCardTokenInput!) {
          createStripeCardToken(input: $input) {
            token {
              id
              created
              livemode
              type
              used
              card {
                id
                brand
                exp_year
              }
            }
          }
        }`,
        variables: {
          token: token
        }
      })
    });

    axios({
      url: process.env.REACT_APP_ENDPOINT,
      method: 'post',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem(AUTH_TOKEN),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        operationName: null,
        query: `mutation updateUser($id: ID, $subscription: String) {
            updateUser(id: $id, subscription: $subscription) {
              user {
                id
                premium
            }
          }
        }`,
        variables: {
          id: localStorage.getItem('USER_ID'),
          subscription: this.state.subscriptionType
        }
      })
    })
      .then(res => {
        console.log(res.data.data.updateUser.user.premium);
        localStorage.setItem(
          'USER_PREMIUM',
          res.data.data.updateUser.user.premium
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    // stripe's checkout plugin receives card information, creates a stripe customer, tokenizes the information, sends the token back to our backend so that our backend can create the charge
    return <div>
        <Card>
          <Typography paragraph>
            {
              'contractAlchemy provides two tiers of service, free and premium.'
            }
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              "Free users use the default theme and have access to all other features but a limit of 8 of each item at one time - 8 clients, 8 jobs, etc."
            }
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              "Premium users have access to all features with an unlimited number of jobs, clients, and so on.  Premium users also have multiple theme choices and the ability to create custom themes.We offer our premium subscription at two different rates - a monthly fee of 99¢ or a yearly fee of $9.99."
            }
          </Typography>
        </Card>
        <Card>
          <Typography paragraph>
            {
              'Choose your rate to subscribe and begin using your premium access!'
            }
          </Typography>
        </Card>
        {/*checkboxes allow user to select which premium plan they want to pay for, then sets the amount in the stripe form*/}
        <React.Fragment>
          <FormControlLabel control={<Checkbox price={999} name="subscription" onClick={this.setSubscriptionType} value="year" type="radio" color="secondary" />} label="Yearly Subscription - $9.99" />
          <FormControlLabel control={<Checkbox price={99} name="subscription" onClick={this.setSubscriptionType} value="month" type="radio" color="secondary" />} label="Monthly Subscription - 99¢" />

          <StripeCheckout amount={this.state.subscriptionAmount} currency="USD" name="contractAlchemy" token={this.getStripeToken} stripeKey="pk_test_4kN2XG1xLysXr0GWDB07nt61" image="https://bestpos.netlify.com/goldraccoon.png" color="black" zipCode={true} billingAddress={true} />
        </React.Fragment>
      </div>;
  }
}

export default Checkout;
