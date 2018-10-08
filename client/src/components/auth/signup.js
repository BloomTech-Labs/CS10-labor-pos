import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Grid,
  withStyles,
  Step,
  Stepper,
  StepLabel,
  Paper,
  CssBaseline,
  Typography
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import { withRouter } from "react-router";
import { TextField, Select } from "../../components";
import { styles } from "../material-ui/styles";
import { STATE_LIST } from "../../constants";
import { AUTH_TOKEN } from "../../constants.js";
const Yup = require("yup");

const UserSchema = Yup.object().shape({
  username: Yup.string("Username is a required field")
    .max(150, "Username must be under 150 characters")
    .required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Please enter a valid email")
});

const ContractorSchema = Yup.object().shape({
  businessName: Yup.string().max(
    100,
    "Business Name must be fewer than 100 characters"
  ),
  firstName: Yup.string()
    .max(30, "First name must be fewer than 30 characters")
    .required("First Name is a required field"),
  lastName: Yup.string()
    .max(150, "Last Name must be fewer than 150 characters")
    .required("Last Name is a required field"),
  streetAddress: Yup.string()
    .max(150, "Street Address must be fewer than 100 characters")
    .required("Street Address is a required field"),
  city: Yup.string()
    .max(70, "City must be fewer than 70 characters")
    .required("City is a required field"),
  state: Yup.string().required(),
  zipcode: Yup.string()
    .max(10)
    .min(5)
    .required("Zipcode is a required field")
});

const ValidationSchemas = [UserSchema, ContractorSchema];

const steps = ["Account details", "Contact information"];

class Wizard extends Component {
  static Page = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
    console.log("Props for wizard", this.props);
    console.log("Props without this", props);
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  };
  submit = (createUser, values, event) => {
    event.preventDefault();
    return createUser({
      variables: {
        businessName: values.businessName,
        firstName: values.firstName,
        lastName: values.lastName,
        streetAddress: values.streetAddress,
        zipcode: values.zipcode,
        city: values.city,
        state: values.state,
        username: values.username,
        password: values.password,
        email: values.email
      }
    });
  };

  _confirm = async data => {
    const { token } = data.createUser;
    this._saveUserData(token);
    this.props.children[1]._owner.memoizedProps.history.push("/");
  };

  // save token to localStorage
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={ValidationSchemas[page]}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, isValid }) => (
          <Mutation
            mutation={CREATE_USER}
            onCompleted={data => this._confirm(data)}
          >
            {createUser => (
              <Form onSubmit={handleSubmit}>
                <Stepper activeStep={page}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activePage}
                <div className="buttons">
                  {page > 0 && (
                    <button
                      type="button"
                      className="secondary"
                      onClick={this.previous}
                    >
                      « Previous
                    </button>
                  )}
                  {console.log("Last page?", page)}
                  {console.log("isValid", isValid)}
                  {console.log("isSubmitting", isSubmitting)}
                  {!isLastPage && <button type="submit">Next »</button>}
                  {isLastPage && (
                    <button
                      role="button"
                      type="submit"
                      disabled={!isValid}
                      onClick={e => {
                        e.preventDefault();
                        this.submit(createUser, values, e);
                      }}
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Mutation>
        )}
      />
    );
  }
}

const CreateUser = props => (
  <React.Fragment>
    <CssBaseline />

    <Wizard
      initialValues={{
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        businessName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: ""
      }}
      onSubmit={actions => {
        actions.setSubmitting(false);
      }}
    >
      <Wizard.Page>
        <main className={props.classes.layout}>
          <Paper className={props.classes.paper}>
            <Typography variant="display1" align="center">
              Sign up with email
            </Typography>
            <Grid container>
              <Grid xs={5}>
                <Field
                  name="username"
                  placeholder="Username"
                  component={TextField}
                  fullWidth={true}
                  label="Username"
                  required
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="field-error"
                />
              </Grid>
              <Grid xs={1} />
              <Grid xs={5}>
                <Field
                  name="password"
                  type="password"
                  placeholder="Please select a secure password"
                  component={TextField}
                  fullWidth={true}
                  label="Password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="field-error"
                />
              </Grid>
              <Grid xs={12}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={TextField}
                  fullWidth={true}
                  label="Email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="field-error"
                />
              </Grid>
            </Grid>
          </Paper>
        </main>
      </Wizard.Page>
      <Wizard.Page>
        <main className={props.classes.layout}>
          <Paper className={props.classes.paper}>
            <Typography variant="display1" align="center">
              Sign up with email
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Field
                  name="firstName"
                  placeholder="First Name"
                  component={TextField}
                  fullWidth={true}
                  label="First Name"
                  required
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="field-error"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  component={TextField}
                  fullWidth={true}
                  label="Last Name"
                  required
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="field-error"
                />
              </Grid>

              <Field
                name="businessName"
                placeholder="Business Name"
                component={TextField}
                fullWidth={true}
                label="Business Name"
                required
              />
              <ErrorMessage
                name="businessName"
                component="div"
                className="field-error"
              />
              <Field
                name="streetAddress"
                placeholder="Street Address"
                component={TextField}
                fullWidth={true}
                label="Street Address"
                required
              />
              <ErrorMessage
                name="streetAddress"
                component="div"
                className="field-error"
              />
              <Field
                name="city"
                placeholder="City"
                component={TextField}
                fullWidth={true}
                label="City"
                required
              />
              <ErrorMessage
                name="city"
                component="div"
                className="field-error"
              />
              <Field
                id="field-state"
                select
                label="State"
                name="state"
                placeholder="State"
                component="select"
                type="text"
                SelectProps={{
                  MenuProps: {
                    className: "mister menu"
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
              </Field>
              <ErrorMessage
                name="state"
                component="div"
                className="field-error"
              />
              <Field
                name="zipcode"
                placeholder="Zipcode"
                component={TextField}
                fullWidth={true}
                label="Zipcode"
                required
              />
              <ErrorMessage
                name="zipcode"
                component="div"
                className="field-error"
              />
            </Grid>
          </Paper>
        </main>
      </Wizard.Page>
    </Wizard>
  </React.Fragment>
);

export default withRouter(withStyles(styles)(CreateUser));
