import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Hidden,
  Typography,
  withStyles
} from "@material-ui/core";
import axios from "axios";
import classNames from "classnames";
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

import { AUTH_TOKEN } from "../../constants.js";
import { styles } from "../material-ui/styles.js";

class Checkout extends Component {
  state = { subscriptionType: "", subscriptionAmount: null };

  // users will choose either the monthly or yearly subscription
  setSubscriptionType = e => {
    const subscriptionType = e.target.value;
    const subscriptionAmount = Number(e.target.name);

    console.log(subscriptionAmount);

    this.setState({ subscriptionType, subscriptionAmount });
  };

  getStripeToken = token => {
    const formData = new FormData();
    formData.append("description", this.state.subscriptionType);
    formData.append("currency", "usd");
    formData.append("amount", this.state.subscriptionAmount);
    formData.append("source", token.id);
    axios({
      url: `${process.env.REACT_APP_ENDPOINT}create-charge/`,
      method: "POST",
      headers: { Authorization: "JWT " + localStorage.getItem(AUTH_TOKEN) },
      data: formData
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
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    const { classes } = this.props;
    // stripe's checkout plugin receives card information, creates a stripe
    // customer, tokenizes the information, sends the token back to our backend
    // so that our backend can create the charge

    return (
      <div>
        {" "}
        <br />
        <Typography className={classes.typography_title}>
          <span className={classes.highlight}>Billing</span>
        </Typography>
        <br />
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography className={classes.billing}>
              Choose subscription and begin using your premium access
            </Typography>{" "}
          </Grid>
          <Grid item xs={12}>
            <StripeCheckout
              amount={this.state.subscriptionAmount}
              currency="USD"
              name="contractAlchemy"
              token={this.getStripeToken}
              stripeKey="pk_test_VFg2TxWkoz0c2FsJlupSqTsl"
              image="https://bestpos.netlify.com/racoonbowtie.svg"
              color="black"
              zipCode={true}
              billingAddress={true}
            />
          </Grid>
          {/*checkboxes allow user to select which premium plan they want to pay for, then sets the amount in the stripe form*/}
          <React.Fragment>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      price="99"
                      name="999"
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
                      price="99"
                      name="99"
                      onClick={this.setSubscriptionType}
                      value="month"
                      type="radio"
                      color="secondary"
                    />
                  }
                  label="Monthly Subscription - 99¢"
                />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Hidden xsUp={user_premium}>
                  <Typography className={classes.premium_results}>
                    You are currently a free user - upgrade today!
                  </Typography>
                </Hidden>
              </Grid>
            </Grid>
          </React.Fragment>

          <Grid item xs={12} md={6} zeroMinWidth>
            <Card className={classes.card}>
              <Typography className={classes.typography_paragraph}>
                Free users:
                <br />
                <br />
                Limits:
                <br />
                <br />6 clients
                <br />
                <br />6 jobs
                <br />
                <br />6 parts
                <br />
                <br />6 notes
                <br />
                <br /> Default theme
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} zeroMinWidth>
            <Card className={classes.premium_card}>
              <Typography
                className={classNames(
                  classes.typography_paragraph,
                  classes.blackfont
                )}
              >
                Premium users:
                <br />
                <br />
                Unlimited record creation!
                <br />
                <br /> Access to multiple themes:
                <br />
                <br />
                Desk
                <br />
                <br />
                Forest
                <br />
                <br />
                Dark Gold
                <br />
                <br />
                ...and more!
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Checkout);
