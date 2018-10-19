import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  withStyles,
  Grid,
  Hidden
} from '@material-ui/core';
import { AUTH_TOKEN } from '../../constants.js';
import { styles } from '../material-ui/styles.js';
import classNames from 'classnames';
import { SETTINGS_QUERY } from '../../queries.js';


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
      method: 'post',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem(AUTH_TOKEN),
        'Content-Type': 'application/graphql'
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
     let user_premium = localStorage.getItem('USER_PREMIUM');
     if (user_premium === 'true') user_premium = true;
     else user_premium = false;
    const { classes } = this.props;
    // stripe's checkout plugin receives card information, creates a stripe customer, tokenizes the information, sends the token back to our backend so that our backend can create the charge

    return <div>
        {' '}
        <br />
        <Typography className={classes.typography_title}>
          <span className={classes.highlight}>Billing</span>
        </Typography>
        <br />
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
            </Typography>{' '}
          </Grid>
          <Grid item xs={12}>
            <StripeCheckout amount={this.state.subscriptionAmount} currency="USD" name="contractAlchemy" token={this.getStripeToken} stripeKey="pk_test_4kN2XG1xLysXr0GWDB07nt61" image="https://bestpos.netlify.com/racoonbowtie.svg" color="black" zipCode={true} billingAddress={true} />
          </Grid>
          {/*checkboxes allow user to select which premium plan they want to pay for, then sets the amount in the stripe form*/}
          <React.Fragment>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox price={999} name="subscription" onClick={this.setSubscriptionType} value="year" type="radio" color="secondary" />} label="Yearly Subscription - $9.99" />
                <FormControlLabel control={<Checkbox price={99} name="subscription" onClick={this.setSubscriptionType} value="month" type="radio" color="secondary" />} label="Monthly Subscription - 99¢" />
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
              <Typography className={classNames(classes.typography_paragraph, classes.blackfont)}>
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
      </div>;
  }
}

export default withStyles(styles)(Checkout);
