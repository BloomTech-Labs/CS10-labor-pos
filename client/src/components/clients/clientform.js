import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Button,
  MenuItem,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";
import { STATE_LIST } from "../../constants";
import { styles } from "../material-ui/styles";
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
  state: Yup.string()
    .max(2)
    .required(),
  zipcode: Yup.string()
    .max(10)
    .min(5)
});

// This component renders as a child of clientview when editing
// the client (path is /clients/%clientid/edit)
// It presents the user with form fields to fill out client information.
// Then it sends a mutation on submit.
class ClientForm extends Component {
  state = {
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "AL",
    zipcode: "",
    deadline: "",
    email: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount = () => {
    if (this.props.mode === "edit") {
      let edit_client = {};
      for (let key in this.state) {
        if (
          this.props.client[key] === null ||
          this.props.client[key] === undefined
        )
          edit_client[key] = "";
        else edit_client[key] = this.props.client[key];
      }
      this.setState({
        businessName: edit_client.businessName,
        firstName: edit_client.firstName,
        lastName: edit_client.lastName,
        streetAddress: edit_client.streetAddress,
        city: edit_client.city,
        state: edit_client.state,
        zipcode: edit_client.zipcode,
        deadline: edit_client.deadline,
        email: edit_client.email
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      deadline,
      email
    } = this.state;
    let button_text = "Create";
    let title_text = "Add Client";
    let chosen_mutation = CREATE_CLIENT;
    if (this.props.mode === "edit") {
      button_text = "Update";
      chosen_mutation = UPDATE_CLIENT;
      if (this.props.client.businessName)
        title_text = `Update ${this.props.client.businessName}`;
      else
        title_text = `Update ${this.props.client.firstName} ${
          this.props.client.lastName
        }`;
    }
    return (
      <Mutation mutation={chosen_mutation} onCompleted={() => this._confirm()}>
        {(mutateClient, { loading, error, data }) => (
          <Formik
            enableReinitialize
            initialValues={{
              businessName: businessName,
              firstName: firstName,
              lastName: lastName,
              streetAddress: streetAddress,
              city: city,
              state: state,
              zipcode: zipcode,
              deadline: deadline,
              email: email
            }}
            validationSchema={ClientSchema}
            onSubmit={() => {
              let client_variables = {
                businessName: businessName,
                firstName: firstName,
                lastName: lastName,
                streetAddress: streetAddress,
                city: city,
                state: state,
                zipcode: zipcode,
                deadline: deadline,
                email: email
              };
              if (client_variables.deadline === "")
                client_variables.deadline = null;
              for (let key in client_variables) {
                if (client_variables[key] === "") {
                  if (this.props.mode === "edit") delete client_variables[key];
                }
              }
              if (this.props.mode === "edit")
                client_variables.id = this.props.match.params.id;
              mutateClient({
                variables: client_variables
              });
              this.setState({
                businessName: "",
                firstName: "",
                lastName: "",
                streetAddress: "",
                city: "",
                state: "AL",
                zipcode: "",
                deadline: "",
                email: ""
              });
            }}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
              <Form>
                <Typography variant="title">{title_text}</Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <Field
                      id="field-businessName"
                      label="Business Name"
                      name="businessName"
                      className={"modal_field"}
                      value={businessName}
                      component={TextField}
                      onChange={this.handleChange("businessName")}
                      helperText="Business Name"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      id="field-firstName"
                      label="First Name"
                      name="firstName"
                      className={"modal_field"}
                      value={firstName}
                      component={TextField}
                      onChange={this.handleChange("firstName")}
                      helperText="First Name"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      id="field-lastName"
                      label="Last Name"
                      name="lastName"
                      className={"modal_field"}
                      value={lastName}
                      component={TextField}
                      onChange={this.handleChange("lastName")}
                      helperText="Last Name"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      id="field-streetAddress"
                      label="Street Address"
                      name="streetAddress"
                      className={"modal_field"}
                      value={streetAddress}
                      component={TextField}
                      onChange={this.handleChange("streetAddress")}
                      helperText="Street Address"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      id="field-email"
                      label="Email"
                      name="email"
                      className={"modal_field"}
                      value={email}
                      component={TextField}
                      onChange={this.handleChange("email")}
                      helperText="Email"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      id="field-city"
                      label="City"
                      name="city"
                      className={"modal_field"}
                      value={city}
                      component={TextField}
                      onChange={this.handleChange("city")}
                      helperText="City"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      id="field-state"
                      select
                      label="State"
                      name="state"
                      className={"modal_field"}
                      value={state}
                      component={TextField}
                      onChange={this.handleChange("state")}
                      SelectProps={{
                        MenuProps: {
                          className: "Mister Menu"
                        }
                      }}
                      helperText="State"
                      margin="normal"
                    >
                      {STATE_LIST.map(state => (
                        <MenuItem key={state.label} value={state.label}>
                          {state.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid item xs={3}>
                      <Field
                        id="field-zipcode"
                        label="Zipcode"
                        name="zipcode"
                        className={"modal_field"}
                        value={zipcode}
                        component={TextField}
                        onChange={this.handleChange("zipcode")}
                        helperText="Zipcode"
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid item xs={3}>
                      <Field
                        id="field-deadline"
                        label="Deadline"
                        name="deadline"
                        className={"modal_field"}
                        value={deadline}
                        component={TextField}
                        onChange={this.handleChange("deadline")}
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <div className="form-bottom-button">
                  <Button type="submit" disabled={isSubmitting}>
                    {button_text}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }

  _confirm = () => {
    window.location.reload();
    this.props.history.push("/clients");
  };
}

export default withRouter(withStyles(styles)(ClientForm));
