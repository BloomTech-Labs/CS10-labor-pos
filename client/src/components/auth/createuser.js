import React, { Component } from "react";
import {
  withStyles,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";
import { UserForm, ContactForm } from "../../components";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../../constants.js";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Account details", "Contact information"];

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      businessName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: ""
    };
    this._next = this._next.bind(this); // 1
    this._prev = this._prev.bind(this); // 2
    this.submit = this.submit.bind(this); // 3
    this._confirm = this._confirm.bind(this); // 4
    /* 1: Allows user to go to previous page of form
    /* 2: Allows user to go to next page of form
    /* 3: Allows user to submit form, which triggers createUser mutation
    /* 4: Takes token off createUser response and saves it to localStorage */
  }

  /* handleChange is getting passed down to UserForm and ContactForm
  This is so that the text from the input fields appears in the state of CreateUser */
  handleChange(name) {
    return event =>
      this.setState({
        [name]: event.target.value
      });
  }

  _next = () => {
    let activeStep = this.state.activeStep;
    // if (activeStep !== 2) {
    this.setState({
      activeStep: activeStep + 1
    });
  };

  _prev = () => {
    let activeStep = this.state.activeStep;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  _confirm = async data => {
    const { token } = data.createUser;
    console.log(data);
    this._saveUserData(token);

    // Go to the root route
    this.props.history.push("/");
  };
  // save token to localStorage
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  submit = createUser => event => {
    event.preventDefault();
    createUser({
      variables: {
        businessName: this.state.businessName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        streetAddress: this.state.streetAddress,
        zipcode: this.state.zipcode,
        city: this.state.city,
        state: this.state.state,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
    });
  };

  getStepContent(step) {
    console.log(this.state);
    switch (step) {
      case 0:
        return (
          <UserForm
            onSubmit={this._next}
            previous={this._prev}
            username={this.state.username}
            onChangeUsername={this.handleChange("username")}
            onChangePassword={this.handleChange("password")}
            onChangeEmail={this.handleChange("email")}
            password={this.state.password}
            email={this.state.email}
          />
        );
      case 1:
        return (
          <ContactForm
            username={this.state.username}
            password={this.state.password}
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            businessName={this.state.businessName}
            streetAddress={this.state.streetAddress}
            city={this.state.city}
            state={this.state.state}
            zipcode={this.state.zipcode}
            onChangeFirstName={this.handleChange("firstName")}
            onChangeLastName={this.handleChange("lastName")}
            onChangeBusinessName={this.handleChange("businessName")}
            onChangeStreetAddress={this.handleChange("streetAddress")}
            onChangeCity={this.handleChange("city")}
            onChangeState={this.handleChange("state")}
            onChangeZipcode={this.handleChange("zipcode")}
            button={this.props.classes.button}
            previous={this._prev}
            submit={this.submit}
            _confirm={this._confirm}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Sign up with email
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography align="center" gutterBottom>
                    <Button>Click to sign in</Button>
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this._prev} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? null : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this._next}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CreateUser));
