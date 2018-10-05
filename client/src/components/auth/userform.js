import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";
const Yup = require("yup");

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .max(150, "Username must be under 150 characters")
    .required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Please enter a valid email")
});

const UserForm = props => {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          username: props.username,
          password: props.password,
          email: props.email
        }}
        validationSchema={SignupSchema}
        onSubmit={event => {
          event.preventDefault();
          props.onSubmit();
        }}
      >
        {({ errors, touched }) => {
          let validity = !(
            !!errors.username ||
            !!errors.password ||
            !!errors.email
          );
          {
            /* if (validity !== props.valid) {
            return props.errorComm(validity);
          } */
          }
          return (
            <React.Fragment>
              <Typography variant="title" gutterBottom>
                Account details
              </Typography>
              <Form
                onBlur={() => {
                  // There's a flaw in this logic - button can toggle
                  // so that if you have multiple fields with errors,
                  // error state becomes falsy and button becomes clickable
                  if (validity != props.valid) {
                    props.errorComm(validity);
                  }
                }}
              >
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <Field
                        name="username"
                        placeholder="Username"
                        component={TextField}
                        fullWidth={true}
                        onChange={props.onChangeUsername}
                        value={props.username}
                        label="Username"
                        required
                      />
                      {errors.username && touched.username ? (
                        <p>{errors.username}</p>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Please select a secure password"
                      component={TextField}
                      fullWidth={true}
                      onChange={props.onChangePassword}
                      value={props.password}
                      label="Password"
                      required
                    />
                    {errors.password && touched.password ? (
                      <p>{errors.password}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      component={TextField}
                      fullWidth={true}
                      onChange={props.onChangeEmail}
                      value={props.email}
                      label="Email"
                      required
                    />
                    {errors.email && touched.email ? (
                      <p>{errors.email}</p>
                    ) : null}
                  </Grid>
                </Grid>
              </Form>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
};

export default withRouter(UserForm);
