import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Button,
  // MenuItem,
  Grid,
  Typography,
  withStyles
  // Select
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "../../components";
import { STATE_LIST } from "../../constants";
import { styles } from "../material-ui/styles";
// import Select from "react-select";
import { CREATE_CLIENT, UPDATE_CLIENT } from "../../mutations.js";
const Yup = require("yup");

const ClientSchema = Yup.object().shape({
  businessName: Yup.string().max(
    100,
    "Business Name must be fewer than 100 characters"
  ),
  firstName: Yup.string()
    .max(100)
    .required("First Name is a required field"),
  lastName: Yup.string()
    .max(100)
    .required(),
  email: Yup.string()
    .max(70)
    .required()
    .email(),
  streetAddress: Yup.string()
    .max(100)
    .required(),
  city: Yup.string()
    .max(70)
    .required(),
  state: Yup.string().required(),
  zipcode: Yup.string()
    .max(10)
    .min(5)
});

// This component renders as a child of clientview when editing
// the client (path is /clients/%clientid/edit)
// It presents the user with form fields to fill out client information.
// Then it sends a mutation on submit.
class ClientForm extends Component {
  render() {
    // Get MaterialUI classes
    const { classes } = this.props;
    let chosen_mutation = CREATE_CLIENT;
    let title_text = "Add Client";
    let button_text = "Create";
    let edit_client = {
      firstName: "",
      lastName: "",
      businessName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: ""
    };
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_CLIENT;

      for (let key in this.props.client) {
        if (
          this.props.client[key] === null ||
          this.props.client[key] === undefined
        )
          edit_client[key] = "";
        else edit_client[key] = this.props.client[key];
      }
      button_text = "Update";
      if (this.props.client.businessName)
        title_text = `Update ${this.props.client.businessName}`;
      else
        title_text = `Update ${this.props.client.firstName} ${
          this.props.client.lastName
        }`;
    }
    return (
      // Give initial values to Formik from the edit_client object
      <Formik
        initialValues={{
          firstName: edit_client.firstName,
          lastName: edit_client.lastName,
          businessName: edit_client.businessName,
          email: edit_client.email,
          streetAddress: edit_client.streetAddress,
          city: edit_client.city,
          state: edit_client.state,
          zipcode: edit_client.zipcode
        }}
        validationSchema={ClientSchema}
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        {({
          errors,
          touched,
          values,
          isValid,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched
        }) => {
          return (
            // This will submit either a create client or update client mutation
            <Mutation
              mutation={chosen_mutation}
              onCompleted={() => this._confirm()}
            >
              {(mutateClient, { loading, error, data }) => (
                <div>
                  {/* This Formik form replaced a base html form
           client_variables is the variables object given to the mutation
           it is comprised of information from Formik's value object*/}
                  <Form
                    onSubmit={event => {
                      event.preventDefault();
                      let client_variables = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        businessName: values.businessName,
                        email: values.email,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        state: values.state,
                        zipcode: values.zipcode
                      };
                      // Here we strip off any empty strings from the variables
                      for (let key in client_variables) {
                        if (client_variables[key] === "") {
                          if (this.props.mode === "edit")
                            delete client_variables[key];
                        }
                      }
                      // If we are in edit mode, we need to send up the client id
                      if (this.props.mode === "edit")
                        client_variables.id = this.props.match.params.id;
                      // Send the mutation ...
                      mutateClient({
                        variables: client_variables
                      });
                    }}
                  >
                    {/* Now the form: Uses grids for positioning */}
                    <div className={classes.root}>
                      <Grid
                        container
                        spacing={24}
                        className={classes.container}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="title"
                            className={classes.typography}
                          >
                            {title_text}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-businessName"
                            label="Business Name"
                            name="businessName"
                            className={classes.textField}
                            value={values.businessName}
                            component={TextField}
                            helperText="Business Name"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-firstName"
                            label="First Name"
                            name="firstName"
                            className={classes.textField}
                            value={values.firstName}
                            component={TextField}
                            helperText="First Name"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            id="field-lastName"
                            label="Last Name"
                            name="lastName"
                            className={classes.textField}
                            value={values.lastName}
                            component={TextField}
                            helperText="Last Name"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-streetAddress"
                            label="Street Address"
                            name="streetAddress"
                            className={classes.textField}
                            value={values.streetAddress}
                            component={TextField}
                            helperText="Street Address"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-email"
                            label="Email"
                            name="email"
                            className={classes.textField}
                            value={values.email}
                            component={TextField}
                            helperText="Email"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-city"
                            label="City"
                            name="city"
                            className={classes.textField}
                            value={values.city}
                            component={TextField}
                            helperText="City"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Select
                            id="field-state"
                            select
                            label="State"
                            name="state"
                            placeholder="State"
                            className={classes.textField}
                            value={values.state}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            component={TextField}
                            error={errors.state}
                            touched={touched.state}
                            type="text"
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                            helperText="State"
                            margin="normal"
                          >
                            {STATE_LIST.map(state => (
                              <option key={state.label} value={state.label}>
                                {state.label}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-zipcode"
                            label="Zipcode"
                            name="zipcode"
                            className={classes.textField}
                            value={values.zipcode}
                            component={TextField}
                            helperText="Zipcode"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            id="field-deadline"
                            label="Deadline"
                            name="deadline"
                            className={classes.textField}
                            value={values.deadline}
                            component={TextField}
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </Grid>
                      </Grid>
                      <div className="form-bottom-button">
                        <Button
                          type="submit"
                          disabled={!isValid}
                          variant="contained"
                          color="primary"
                          className={classes.padded_button}
                          type="submit"
                        >
                          {button_text}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Formik>
    );
  }

  _confirm = () => {
    window.location.reload();
    this.props.history.push("/clients");
  };
}

export default withRouter(withStyles(styles)(ClientForm));
