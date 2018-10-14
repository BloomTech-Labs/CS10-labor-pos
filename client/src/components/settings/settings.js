import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grade } from "@material-ui/icons";
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
} from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import { SETTINGS_QUERY } from "../../queries.js";
import { UPDATE_USER } from "../../mutations.js";
import { STATE_LIST } from "../../constants";
import { styles } from "../material-ui/styles.js";
import jwt_decode from "jwt-decode";
import { Formik, Field, Form } from "formik";
import { TextField } from "../../components";
import classNames from "classnames";
var Yup = require("yup");

const SettingsSchema = Yup.object().shape({
  oldPassword: Yup.string(),
  newPassword: Yup.string(),
  businessName: Yup.string().max(
    100,
    "Business name must be fewer than 100 characters"
  ),
  firstName: Yup.string().max(
    100,
    "First name must be fewer than 100 characters"
  ),
  lastName: Yup.string().max(
    100,
    "Last Name must be fewer than 100 characters"
  ),
  email: Yup.string()
    .email("Must provide a valid email")
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
    const { classes } = this.props;
    let edit_user = {};
    for (let key in this.props.user) {
      if (this.props.user[key] === null) edit_user[key] = "";
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
                      mutateJob({
                        variables: user_variables
                      });
                    }}
                  >
                    <Grid container>
                      <Grid item xs={4} />
                      <Grid item xs={4}>
                        <Typography
                          variant="title"
                          className={classes.typography}
                        >
                          Settings
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <IconButton disabled={!values.premium}>
                          <Grade />
                        </IconButton>
                        <Hidden xsUp={!values.premium}>
                          <Typography className={classes.typography}>
                            Premium member paid until {values.paidUntil}
                          </Typography>
                        </Hidden>
                      </Grid>
                      <Hidden xsUp={this.state.changePassword}>
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                          <Typography
                            className={classes.typography}
                            variant="subheading"
                          >
                            Change Password
                          </Typography>
                          <Paper className={classes.card}>
                            <Grid container>
                              <Grid item xs={5}>
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
                              <Grid item xs={1} />
                              <Grid item xs={5}>
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
                              <Grid item xs={1} />
                            </Grid>
                          </Paper>
                        </Grid>
                      </Hidden>
                      <Grid item xs={1} />
                      <Grid item xs={3}>
                        <Typography
                          className={classes.typography}
                          variant="subheading"
                        >
                          Business Name
                        </Typography>
                        <Paper className={classes.card}>
                          <Grid container>
                            <Grid item xs={10}>
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
                            </Grid>
                            <Grid item xs={2} />
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <Typography
                          className={classes.typography}
                          variant="subheading"
                        >
                          Name
                        </Typography>
                        <Paper className={classes.card}>
                          <Grid container>
                            <Grid item xs={6}>
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
                            <Grid item xs={6}>
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
                            <Grid item xs={1} />
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={1} />
                      <Grid item xs={10}>
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
                            <Grid item xs={8}>
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
                            <Grid item xs={2}>
                              <Field
                                id="state"
                                select="true"
                                label="State"
                                name="state"
                                placeholder="State"
                                margin="normal"
                                className={classNames(
                                  classes.margin,
                                  classes.field,
                                  classes.state_field,
                                  classes.menuitems
                                )}
                                style={{ height: "55px" }}
                                component="select"
                              >
                                {STATE_LIST.map(state => (
                                  <option
                                    key={state.label}
                                    value={state.value}
                                    className={classes.menuitems}
                                  >
                                    {state.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
                            <Grid item xs={1}>
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
                      <Grid item xs={1} />
                      <Grid item xs={9} />
                      <Grid item xs={2}>
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
                      <Grid item xs={1} />
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <Paper elevation={4} square className={classes.card}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell />
                                <TableCell numeric>Used</TableCell>
                                <TableCell numeric>
                                  Free Account Allotment
                                </TableCell>
                                <TableCell numeric>Remaining</TableCell>
                                <TableCell>Premium</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Clients</TableCell>
                                <TableCell numeric>
                                  {this.props.item_counts.clients}
                                </TableCell>
                                <TableCell numeric>1</TableCell>
                                <TableCell numeric>
                                  {1 - this.props.item_counts.clients}
                                </TableCell>
                                <TableCell>unlimited!</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Jobs</TableCell>
                                <TableCell numeric>
                                  {this.props.item_counts.jobs}
                                </TableCell>
                                <TableCell numeric>8</TableCell>
                                <TableCell numeric>
                                  {8 - this.props.item_counts.jobs}
                                </TableCell>
                                <TableCell>unlimited!</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Notes</TableCell>
                                <TableCell numeric>
                                  {this.props.item_counts.notes}
                                </TableCell>
                                <TableCell numeric>8</TableCell>
                                <TableCell numeric>
                                  {8 - this.props.item_counts.notes}
                                </TableCell>
                                <TableCell>unlimited!</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Parts</TableCell>
                                <TableCell numeric>
                                  {this.props.item_counts.parts}
                                </TableCell>
                                <TableCell numeric>8</TableCell>
                                <TableCell numeric>
                                  {8 - this.props.item_counts.parts}
                                </TableCell>
                                <TableCell>unlimited!</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Paper>
                      </Grid>
                      <Grid item xs={1} />
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
      <Query query={SETTINGS_QUERY}>
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const decoded_token = jwt_decode(localStorage.getItem("auth-token"));
          const user = data.allUsers.edges.filter(user => {
            return user.node.username === decoded_token.username;
          })[0].node;

          const item_counts = {
            clients: data.allClients.edges.length,
            jobs: data.allJobs.edges.length,
            notes: data.allNotes.edges.length,
            parts: data.allClients.edges.length
          };
          return (
            <Settings
              refetch={refetch}
              user={user}
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
