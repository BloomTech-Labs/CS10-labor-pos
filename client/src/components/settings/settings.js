import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Grade from '@material-ui/icons/Grade.js';
import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Hidden,
  withStyles
} from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import { SETTINGS_QUERY } from '../../queries.js';
import { UPDATE_USER } from '../../mutations.js';
import { STATE_LIST } from '../../constants';
import { styles } from '../material-ui/styles.js';
import { Formik, Field, Form } from 'formik';
import { TextField } from '../../components';
import classNames from 'classnames';
var Yup = require('yup');

const SettingsSchema = Yup.object().shape({
  oldPassword: Yup.string(),
  newPassword: Yup.string(),
  businessName: Yup.string().max(
    100,
    'Business name must be fewer than 100 characters'
  ),
  firstName: Yup.string().max(
    100,
    'First name must be fewer than 100 characters'
  ),
  lastName: Yup.string().max(
    100,
    'Last Name must be fewer than 100 characters'
  ),
  email: Yup.string()
    .email('Must provide a valid email')
    .max(70),
  streetAddress: Yup.string().max(100),
  city: Yup.string(),
  zipcode: Yup.string()
    .max(10)
    .min(5),
  premium: Yup.boolean(),
  paidUntil: Yup.date().nullable()
});
//  This component will render on the /settings route when the user is logged in
//  It is a child of the home component.
//  It presents the user with forms that allow them to view and edit their user
//  information and settings.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rFA17
class Settings extends Component {
  state = {
    changePassword: false,
    changeBusinessName: false,
    changeName: false,
    changeContact: false
  };
  render() {
    let user_premium = localStorage.getItem('USER_PREMIUM');
    if (user_premium === 'true') user_premium = true;
    else user_premium = false;
    const { classes } = this.props;
    let edit_user = {};
    for (let key in this.props.user) {
      if (this.props.user[key] === null) edit_user[key] = '';
      else edit_user[key] = this.props.user[key];
    }
    return (
      <Formik
        initialValues={{
          oldPassword: edit_user.oldPassword,
          newPassword: edit_user.newPassword,
          businessName: edit_user.businessName,
          firstName: edit_user.firstName,
          lastName: edit_user.lastName,
          streetAddress: edit_user.streetAddress,
          city: edit_user.city,
          state: edit_user.state,
          zipcode: edit_user.zipcode,
          premium: edit_user.premium,
          paidUntil: edit_user.paidUntil,
          username: edit_user.username
        }}
        validationSchema={SettingsSchema}
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        {({ values, isValid }) => {
          const paid_until = new Date(values.paidUntil);
          return (
            <Mutation
              mutation={UPDATE_USER}
              onCompleted={() => this._confirm(this.props.refetch)}
            >
              {(mutateJob, { loading, error, data }) => (
                <div>
                  <Form
                    onSubmit={event => {
                      event.preventDefault();
                      let user_variables = {
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                        businessName: values.businessName,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        state: values.state,
                        zipcode: values.zipcode
                      };

                      user_variables.id = this.props.user.id;
                      mutateJob({ variables: user_variables });
                    }}
                  >
                    <Grid container spacing={24}>
                      <Grid item xs={3} />
                      <Grid item xs={6}>
                        <br />
                        <Typography
                          variant="title"
                          className={classes.typography_title}
                        >
                          Settings
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Hidden xsUp={!user_premium}>
                          <Grade className={classes.premium_results} />
                        </Hidden>
                        <Hidden xsUp={!user_premium}>
                          <Typography className={classes.premium_results}>
                            Premium member paid until:{' '}
                            {`${paid_until.getMonth() +
                              1}/${paid_until.getDate()}/${paid_until.getFullYear()}`}
                          </Typography>
                        </Hidden>
                      </Grid>
                      <Hidden xsUp={this.state.changePassword}>
                        <Grid item xs={12} md={6}>
                          <Typography
                            className={classes.typography}
                            variant="subheading"
                          >
                            Change Password
                          </Typography>
                          <Paper className={classes.card}>
                            <Grid container spacing={24}>
                              <Grid item xs={12} md={6}>
                                <Field
                                  id="field-oldPassword"
                                  label="Current Password"
                                  type="password"
                                  fullWidth
                                  component={TextField}
                                  name="oldPassword"
                                  className={classNames(
                                    classes.margin,
                                    classes.textField
                                  )}
                                  value={values.oldPassword}
                                  margin="normal"
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <Field
                                  id="field-newPassword"
                                  label="New Password"
                                  type="password"
                                  fullWidth
                                  component={TextField}
                                  name="newPassword"
                                  className={classNames(
                                    classes.margin,
                                    classes.textField
                                  )}
                                  value={values.newPassword}
                                  margin="normal"
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Hidden>
                      <Grid item xs={12} md={6}>
                        <Typography
                          className={classes.typography}
                          variant="subheading"
                        >
                          Business Name
                        </Typography>
                        <Paper className={classes.card}>
                          <Field
                            id="field-businessName"
                            label="Business Name"
                            name="businessName"
                            fullWidth
                            component={TextField}
                            className={classNames(
                              classes.margin,
                              classes.textField
                            )}
                            value={values.businessName}
                            margin="normal"
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.typography}
                          variant="subheading"
                        >
                          Name
                        </Typography>
                        <Paper className={classes.card}>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Field
                                id="field-firstName"
                                label="First Name"
                                name="firstName"
                                fullWidth
                                component={TextField}
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                value={values.firstName}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                id="field-lastName"
                                label="Last Name"
                                fullWidth
                                name="lastName"
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                component={TextField}
                                value={values.lastName}
                                margin="normal"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          className={classes.typography}
                          variant="subheading"
                        >
                          Contact Information
                        </Typography>
                        <Paper className={classes.card}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Field
                                id="field-streetAddress"
                                label="Street Address"
                                fullWidth
                                component={TextField}
                                name="streetAddress"
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                value={values.streetAddress}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id="field-city"
                                label="City"
                                name="city"
                                fullWidth
                                component={TextField}
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                value={values.city}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Field
                                id="state"
                                select="true"
                                label="State"
                                name="state"
                                fullWidth
                                placeholder="State"
                                margin="normal"
                                className={classNames(
                                  classes.margin,
                                  classes.field,
                                  classes.state_field,
                                  classes.menuitems,
                                  classes.paper_color
                                )}
                                style={{ height: '55px' }}
                                component="select"
                              >
                                {STATE_LIST.map(state => (
                                  <option
                                    key={state.label}
                                    value={state.label}
                                    className={classes.menuitems}
                                  >
                                    {state.label}
                                  </option>
                                ))}
                              </Field>
                              <Typography>State</Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Field
                                id="field-zipcode"
                                label="Zipcode"
                                name="zipcode"
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                component={TextField}
                                value={values.zipcode}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                id="field-email"
                                label="Email"
                                name="email"
                                className={classNames(
                                  classes.margin,
                                  classes.textField
                                )}
                                component={TextField}
                                value={values.email}
                                margin="normal"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          className={classes.padded_button}
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!isValid}
                        >
                          Save Changes
                        </Button>
                        {loading && (
                          <Typography>Saving information...</Typography>
                        )}
                        {data && <Typography>Success!</Typography>}
                        {error && <Typography>Error!</Typography>}
                      </Grid>

                      <Grid item xs={12}>
                        <Hidden smDown>
                          <Paper elevation={4} square className={classes.card}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell />
                                  <TableCell className={classes.results}>
                                    Used
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    Free Account Allotment
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    Remaining
                                  </TableCell>
                                  <TableCell
                                    className={classNames(
                                      classes.results,
                                      classes.premium_results
                                    )}
                                  >
                                    Premium
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell className={classes.results}>
                                    Clients
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {this.props.item_counts.clients}
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    1
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {1 - this.props.item_counts.clients}
                                  </TableCell>
                                  <TableCell
                                    className={classNames(
                                      classes.results,
                                      classes.premium_results
                                    )}
                                  >
                                    unlimited!
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className={classes.results}>
                                    Jobs
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {this.props.item_counts.jobs}
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    8
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {8 - this.props.item_counts.jobs}
                                  </TableCell>
                                  <TableCell
                                    className={classNames(
                                      classes.results,
                                      classes.premium_results
                                    )}
                                  >
                                    unlimited!
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className={classes.results}>
                                    Notes
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {this.props.item_counts.notes}
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    8
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {8 - this.props.item_counts.notes}
                                  </TableCell>
                                  <TableCell
                                    className={classNames(
                                      classes.results,
                                      classes.premium_results
                                    )}
                                  >
                                    unlimited!
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className={classes.results}>
                                    Parts
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {this.props.item_counts.parts}
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    8
                                  </TableCell>
                                  <TableCell className={classes.results}>
                                    {8 - this.props.item_counts.parts}
                                  </TableCell>
                                  <TableCell
                                    className={classNames(
                                      classes.results,
                                      classes.premium_results
                                    )}
                                  >
                                    unlimited!
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Paper>
                        </Hidden>
                      </Grid>
                    </Grid>

                    {/* <Hidden xsUp={conditions didn't press button yet}>
                          component with static view and button to edit
                          <button onClick={method that toggles the boolean that our hiiden tag is looking at} />
                        </Hidden>
                        <Hidden xsUp={inverse of the boolean used in prior hidden}>
                          component with our existing forms plus a cancel button that toggles back to the other view
                          cancel button should also reset field values to prevent weird behaviour.
                        </Hidden>*/}
                  </Form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Formik>
    );
  }
  _confirm = method => {
    method();
  };
}

class SettingsWrapper extends Component {
  render = () => {
    return (
      <Query
        query={SETTINGS_QUERY}
        variables={{ id: localStorage.getItem('USER_ID') }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;

          const item_counts = {
            clients: data.allClients.edges.length,
            jobs: data.allJobs.edges.length,
            notes: data.allNotes.edges.length,
            parts: data.allClients.edges.length
          };
          return (
            <Settings
              refetch={refetch}
              user={data.user}
              item_counts={item_counts}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  };
}

export default withRouter(withStyles(styles)(SettingsWrapper));
