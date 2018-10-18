import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  withStyles,
  Grid
} from "@material-ui/core";
import { AUTH_TOKEN } from "../../constants.js";
import { styles } from "../material-ui/styles.js";
import classNames from "classnames";
} from '@material-ui/core';
import { AUTH_TOKEN } from '../../constants.js';
import { styles } from '../material-ui/styles.js';

class Checkout extends Component {
  state = {
    subscriptionType: "",
    subscriptionAmount: null
  };

  // users will choose either the monthly or yearly subscription
  setSubscriptionType = e => {
    const { value: subscriptionType } = e.target;
    const subscriptionAmount = Number(e.target.attributes["price"]);

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
      method: "post",
      headers: {
        Authorization: "JWT " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/json"
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
          id: localStorage.getItem("USER_ID"),
          subscription: this.state.subscriptionType
        }
      })
    })
      .then(res => {
        console.log(res.data.data.updateUser.user.premium);
        localStorage.setItem(
          "USER_PREMIUM",
          res.data.data.updateUser.user.premium
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    // stripe's checkout plugin receives card information, creates a stripe customer, tokenizes the information, sends the token back to our backend so that our backend can create the charge

    return (
      <div>
        {" "}
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12} zeroMinWidth>
            <Typography className={classes.typography_title_checkout}>
              {
                "contractAlchemy provides two tiers of service - free and premium."
              }
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} zeroMinWidth>
            <Card className={classes.card}>
              <Typography className={classes.typography_paragraph}>
                <pre
                >{`Free users:\n\nLimits:\n\n8 clients\n\n8 jobs\n\n8 parts\n\n8 notes\n\n* Default theme`}</pre>
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} zeroMinWidth>
            <Card className={classes.card}>
              <Typography className={classes.typography_paragraph}>
                <pre>
                  {`Premium users:\n\n* Unlimited record creation!\n\n* Access to multiple themes:\n\nDesk\n\nForest\n\nDark Gold\n\n...and more!`}
                </pre>
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Typography className={classes.typography_paragraph}>
              {
                "Choose your preferred subscription type and begin using your premium access!"
              }
            </Typography>{" "}
            <br />
          </Card>
        </Grid>
        {/*checkboxes allow user to select which premium plan they want to pay for, then sets the amount in the stripe form*/}
        <React.Fragment>
          <Grid container>
            <Grid xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    price={999}
                    name="subscription"
                    onClick={this.setSubscriptionType}
                    value="year"
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
                    value="month"
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
                image="https://bestpos.netlify.com/racoonbowtie.svg"
                color="black"
                zipCode={true}
                billingAddress={true}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>;
  }
}

export default withStyles(styles)(Checkout);
