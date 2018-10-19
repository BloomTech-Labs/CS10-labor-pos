import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  withStyles,
  Step,
  Stepper,
  StepLabel,
  Paper,
  CssBaseline,
  Typography,
  FormControl,
  Button
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router";
import { CREATE_USER } from "../../mutations";
import { withRouter } from "react-router";
import { TextField } from "../../components";
import { styles } from "../material-ui/styles";
import { STATE_LIST } from "../../constants";
import { AUTH_TOKEN } from "../../constants.js";
const Yup = require("yup");

const UserSchema = Yup.object().shape({
  username: Yup.string()
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
  state: Yup.string().required("State is a required field"),
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
      values: props.initialValues,
      isAuthenticated: false
    };
  }

  next = values => {
    console.log("Next props", this.props);
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  };

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
    const { token, user } = data.createUser;
    this._saveUserData(token, user.id, user.premium);
    // changed to fix heroku
    this.setState({
      isAuthenticated: true
    });
  };

  // save token to localStorage
  _saveUserData = (token, id, premium) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("USER_ID", id);
    localStorage.setItem("USER_PREMIUM", premium);
  };

  render() {
    const { children } = this.props;
    const { page, values, isAuthenticated } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={ValidationSchemas[page]}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isValid }) => (
          <Mutation
            mutation={CREATE_USER}
            errorPolicy="all"
            onCompleted={data => this._confirm(data)}
          >
            {(createUser, { loading, error }) => (
              <Form onSubmit={handleSubmit} style={{ margin: "auto" }}>
                <Stepper activeStep={page}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Typography variant="display1" align="center">
                  Sign up with email
                </Typography>
                {activePage}
                {error && (
                  <pre>
                    {error.graphQLErrors.map(
                      ({ message }, i) =>
                        message.includes("duplicate") && (
                          <Typography key={i} align="center" color="error">
                            Username already exists
                          </Typography>
                        )
                    )}
                  </pre>
                )}
                <div
                  className="buttons"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {page > 0 && (
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={this.previous}
                    >
                      « Previous
                    </Button>
                  )}
                  {loading && <Typography>Loading ...</Typography>}
                  {!isLastPage && (
                    <Button type="submit" color="primary" variant="contained">
                      Next »
                    </Button>
                  )}
                  {isLastPage && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                      onClick={e => {
                        e.preventDefault();
                        this.submit(createUser, values, e);
                      }}
                    >
                      Create Account
                    </Button>
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
        <Paper className={props.classes.paper}>
          <FormControl margin="normal" fullWidth>
            <Field
              name="username"
              placeholder="Username"
              component={TextField}
              fullWidth={true}
              label="Username"
              required
            />
            <Field
              name="password"
              type="password"
              placeholder="Please select a secure password"
              component={TextField}
              fullWidth={true}
              label="Password"
              required
            />
            <Field
              name="email"
              type="email"
              placeholder="Email"
              component={TextField}
              fullWidth={true}
              label="Email"
              required
            />
          </FormControl>
        </Paper>
      </Wizard.Page>
      <Wizard.Page>
        <Paper className={props.classes.paper}>
          <FormControl margin="normal" fullWidth>
            <Field
              name="firstName"
              placeholder="First Name"
              component={TextField}
              fullWidth={true}
              label="First Name"
              required
            />
            <Field
              name="lastName"
              placeholder="Last Name"
              component={TextField}
              fullWidth={true}
              label="Last Name"
              required
            />
            <Field
              name="businessName"
              placeholder="Business Name"
              component={TextField}
              fullWidth={true}
              label="Business Name"
            />
            <Field
              name="streetAddress"
              placeholder="Street Address"
              component={TextField}
              fullWidth={true}
              label="Street Address"
              required
            />
            <Field
              name="city"
              placeholder="City"
              component={TextField}
              fullWidth={true}
              label="City"
              className={props.classes.space_below}
              required
            />
            <Field
              id="field-state"
              select="true"
              label="State"
              name="state"
              placeholder="State"
              component="select"
              margin="normal"
              className={props.classes.state_field}
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
            <Field
              name="zipcode"
              placeholder="Zipcode"
              component={TextField}
              fullWidth={true}
              label="Zipcode"
              required
            />
          </FormControl>
        </Paper>
      </Wizard.Page>
    </Wizard>
  </React.Fragment>
);

export default withRouter(withStyles(styles)(CreateUser));
