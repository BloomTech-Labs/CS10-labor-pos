import React from "react";
import { withRouter } from "react-router";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import "./contactform.css";
import { Button, Grid, MenuItem, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";

import { STATE_LIST } from "../../constants.js";
const Yup = require("yup");

const CreateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "Max length is 30 characters")
    .required("First Name is a required field"),
  businessName: Yup.string(),
  lastName: Yup.string("Last name is a required field")
    .max(150, "Maximum length is 150 characters")
    .required(),
  streetAddress: Yup.string()
    .max(100, "Maximum length is 100 characters")
    .required("Street Address is a required field"),
  city: Yup.string()
    .max(70)
    .required("City is a required field"),
  state: Yup.string().required("State is a required field"),
  zipcode: Yup.string()
    .max(10)
    .min(5)
    .required("Zipcode is a required field")
});

const ContactForm = props => {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Address
      </Typography>
      <Mutation
        mutation={CREATE_USER}
        onCompleted={data => props._confirm(data)}
      >
        {(createUser, { loading, error, data }) => (
          <Formik
            enableReinitialize
            initialValues={{
              username: props.username,
              password: props.password,
              email: props.email,
              firstName: props.firstName,
              lastName: props.lastName,
              businessName: props.BusinessName,
              streetAddress: props.streetAddress,
              city: props.city,
              state: props.state,
              zipcode: props.zipcode
            }}
            validationSchema={CreateUserSchema}
            onSubmit={() => {
              props.submit(createUser);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="firstName"
                      name="firstName"
                      component={TextField}
                      InputLabelProps={{ shrink: true }}
                      fullWidth={true}
                      value={props.firstName}
                      onChange={props.onChangeFirstName}
                      label="First Name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <p>{errors.firstName}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="lastName"
                      name="lastName"
                      InputLabelProps={{ shrink: true }}
                      fullWidth={true}
                      component={TextField}
                      value={props.lastName}
                      onChange={props.onChangeLastName}
                      label="Last Name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <p>{errors.lastName}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      id="businessName"
                      label="Business Name"
                      name="businessName"
                      fullWidth={true}
                      component={TextField}
                      value={props.businessName}
                      onChange={props.onChangeBusinessName}
                    />
                    {errors.businessName && touched.businessName ? (
                      <p>{errors.businessName}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      id="streetAddress"
                      name="streetAddress"
                      fullWidth={true}
                      component={TextField}
                      value={props.streetAddress}
                      onChange={props.onChangeStreetAddress}
                      label="Street Address"
                    />
                    {errors.streetAddress && touched.streetAddress ? (
                      <p>{errors.streetAddress}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="city"
                      name="city"
                      InputLabelProps={{ shrink: true }}
                      fullWidth={true}
                      component={TextField}
                      value={props.city}
                      onChange={props.onChangeCity}
                      label="City"
                    />
                    {errors.city && touched.city ? <p>{errors.city}</p> : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      id="state"
                      required
                      select
                      InputLabelProps={{ shrink: true }}
                      label="State"
                      name="state"
                      value={props.state}
                      component={TextField}
                      fullWidth={true}
                      onChange={props.onChangeState}
                    >
                      {STATE_LIST.map(state => (
                        <MenuItem key={state.label} value={state.label}>
                          {state.label}
                        </MenuItem>
                      ))}
                    </Field>
                    {errors.state && touched.state ? (
                      <p>{errors.state}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      id="zipcode"
                      name="zipcode"
                      InputLabelProps={{ shrink: true }}
                      fullWidth={true}
                      component={TextField}
                      value={props.zipcode}
                      onChange={props.onChangeZipcode}
                      label="Zipcode"
                    />
                    {errors.zipcode && touched.zipcode ? (
                      <p>{errors.zipcode}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="HELL">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="SignUpButon"
                      >
                        Finish Account Creation
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    </React.Fragment>
  );
};

export default withRouter(ContactForm);
