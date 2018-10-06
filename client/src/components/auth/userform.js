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
        {({ errors, touched, handleChange }) => {
          let validity = {
            username: !!errors.username,
            password: !!errors.password,
            email: !!errors.email
          };

          if (
            !!touched.email !== !!props.email_touched &&
            !props.email_touched
          ) {
            props.handleTouch("email_touched");
          }
          if (
            !!touched.password !== !!props.password_touched &&
            !props.password_touched
          ) {
            props.handleTouch("password_touched");
          }
          if (
            !!touched.username !== !!props.username_touched &&
            !props.username_touched
          ) {
            props.handleTouch("username_touched");
          }

          for (let key in validity) {
            if (validity[key] !== props.valid[key]) {
              props.errorComm(validity);
            }
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
                  if (validity !== props.valid) {
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
                        onChange={e => {
                          handleChange(e);
                          props.onChangeUsername(e);
                        }}
                        value={props.username}
                        label="Username"
                        required
                      />
                      {props.valid.username && props.email_touched ? (
                        <Typography color="error">{errors.username}</Typography>
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
                      onChange={e => {
                        handleChange(e);
                        props.onChangePassword(e);
                      }}
                      value={props.password}
                      label="Password"
                      required
                    />
                    {props.valid.password && props.email_touched ? (
                      <Typography color="error">{errors.password}</Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      component={TextField}
                      fullWidth={true}
                      onChange={e => {
                        handleChange(e);
                        props.onChangeEmail(e);
                      }}
                      value={props.email}
                      label="Email"
                      required
                    />
                    {props.valid.email && props.email_touched ? (
                      <Typography color="error">{errors.email}</Typography>
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
