import React, { Component } from "react";
import {
  withStyles,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../../constants.js";
import { UserForm, ContactForm } from "../../components";
import { styles } from "../material-ui/styles";
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
      zipcode: "",
      valid: false
    };
    this._next = this._next.bind(this); // 1
    this._prev = this._prev.bind(this); // 2
    this.submit = this.submit.bind(this); // 3
    this._confirm = this._confirm.bind(this); // 4
    this.errorComm = this.errorComm.bind(this); // 5
    /* 1: Allows user to go to previous page of form
       2: Allows user to go to next page of form
       3: Allows user to submit form, which triggers createUser mutation
       4: Takes token off createUser response and saves it to localStorage
       5: Validates the form for createUser */
  }

  /* handleChange is getting passed down to UserForm and ContactForm
  This is so that the text from the input fields appears in the state of CreateUser */
  handleChange(name) {
    return event =>
      this.setState({
        [name]: event.target.value
      });
  }

  errorComm = result => {
    this.setState({ valid: result });
  };

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
    let content = null;
    switch (step) {
      case 0:
        content = (
          <UserForm
            onSubmit={this._next}
            previous={this._prev}
            username={this.state.username}
            onChangeUsername={this.handleChange("username")}
            onChangePassword={this.handleChange("password")}
            onChangeEmail={this.handleChange("email")}
            password={this.state.password}
            email={this.state.email}
            errorComm={this.errorComm}
            valid={this.state.valid}
          />
        );
        break;
      case 1:
        content = (
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
            handleBlur={this.handleBlur}
          />
        );
        break;
      default:
        throw new Error("Unknown step");
    }
    return content;
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
                  <Grid container>
                    <Grid item xs={10} />
                    <Grid item xs={2}>
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button
                            variant="outlined"
                            onClick={this._prev}
                            className={classes.button}
                          >
                            Back
                          </Button>
                        )}
                        {activeStep === steps.length - 1 ? null : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this._next}
                            disabled={!this.state.valid}
                            className={classes.button}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </Grid>
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
