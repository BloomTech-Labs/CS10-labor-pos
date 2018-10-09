import React, { Component } from "react";
import classNames from "classnames";
import { withRouter } from "react-router";
import {
  Button,
  Grid,
  Typography,
  withStyles,
  Paper,
  FormControl
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "../../components";
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
    .required("First Name is required"),
  lastName: Yup.string()
    .max(100)
    .required("Last Name is required"),
  email: Yup.string()
    .max(70)
    .required("Email is required")
    .email(),
  streetAddress: Yup.string()
    .max(100)
    .required("Address is required"),
  city: Yup.string()
    .max(70)
    .required("City is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.string()
    .max(10)
    .min(5)
    .required("Zipcode is required")
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
    let edit_client = {};
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_CLIENT;
      button_text = "Update";
      for (let key in this.props.client) {
        if (this.props.client[key] === null) edit_client[key] = "";
        else edit_client[key] = this.props.client[key];
      }

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
        {({ values, isValid, handleSubmit }) => {
          console.log("This.props in Formik", this.props);
          return (
            // This will submit either a create client or update client mutation
            <Mutation
              mutation={chosen_mutation}
              onCompleted={() => this._confirm()}
            >
              {mutateClient => (
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
                      if (this.props.mode === "edit") {
                        client_variables.id = this.props.match.params.id;
                        for (let key in client_variables) {
                          if (client_variables[key] === "")
                            delete client_variables[key];
                        }
                      }

                      return mutateClient({
                        variables: client_variables
                      });
                    }}
                  >
                    {/* Now the form: Uses grids for positioning */}
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="title"
                          className={classes.typography}
                        >
                          {title_text}
                        </Typography>
                      </Grid>
                      <Paper margin="normal" className={classes.paper}>
                        <Field
                          id="field-businessName"
                          label="Business Name"
                          name="businessName"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.businessName}
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          id="field-firstName"
                          label="First Name"
                          name="firstName"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.firstName}
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          id="field-lastName"
                          label="Last Name"
                          name="lastName"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.lastName}
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          id="field-email"
                          label="Email"
                          name="email"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.email}
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          id="field-streetAddress"
                          label="Street Address"
                          name="streetAddress"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.streetAddress}
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          id="field-city"
                          label="City"
                          name="city"
                          variant="outlined"
                          className={classNames(
                            classes.margin,
                            classes.textField
                          )}
                          value={values.city}
                          component={TextField}
                          margin="normal"
                        />
                        <div className={classNames(classes.margin)}>
                          <FormControl>
                            <Field
                              id="field-state"
                              select="true"
                              label="State"
                              name="state"
                              placeholder="State"
                              component="select"
                              margin="normal"
                              className={classNames(
                                classes.margin,
                                classes.textField,
                                classes.state_field
                              )}
                              style={{ width: "194px", height: "55px" }}
                            >
                              {STATE_LIST.map(state => (
                                <option key={state.label} value={state.label}>
                                  {state.label}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="state"
                              component="div"
                              style={{
                                color: "#f44336",
                                fontWeight: "300"
                              }}
                            />
                          </FormControl>
                          <Field
                            id="field-zipcode"
                            label="Zipcode"
                            name="zipcode"
                            variant="outlined"
                            className={classNames(
                              classes.margin,
                              classes.textField
                            )}
                            value={values.zipcode}
                            component={TextField}
                            margin="normal"
                          />
                        </div>
                      </Paper>
                      <div
                        className="form-bottom-button"
                        style={{ margin: "auto" }}
                      >
                        <Button
                          type="submit"
                          disabled={!isValid}
                          variant="contained"
                          color="primary"
                          className={classes.padded_button}
                          style={{ marginBottom: "50px" }}
                        >
                          {button_text}
                        </Button>
                      </div>
                    </Grid>
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
