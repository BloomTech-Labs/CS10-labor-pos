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
import UserForm from "./user";
import ContactForm from "./contractor";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

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

let fieldValues = {
  username: "",
  email: "",
  password: ""
};

const steps = ["Account details", "Contact information"];

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0
    };
    this.saveValues = this.saveValues.bind(this);
  }

  saveValues = info => {
    this.setState({
      username: info.username,
      password: info.password,
      email: info.email
    });
  };

  _next() {
    let activeStep = this.state.activeStep;
    this.setState({
      activeStep: activeStep + 1
    });
  }

  _prev() {
    let activeStep = this.state.activeStep;
    this.setState({
      activeStep: activeStep - 1
    });
  }

  submitRegistration() {
    this._next();
  }

  getStepContent(step) {
    console.log(this.state);
    switch (step) {
      case 0:
        return (
          <UserForm
            next={this._next}
            previous={this._prev}
            save={this.saveValues.bind(this)}
          />
        );
      case 1:
        return (
          <ContactForm
            username={this.state.username}
            password={this.state.password}
            email={this.state.email}
            previous={this._prev}
            submit={this.submitRegistration}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep, username, password, email } = this.state;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Sign up with email
            </Typography>
            <Stepper
              activeStep={activeStep}
              username={username}
              password={password}
              email={email}
              className={classes.stepper}
            >
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
                      <Button
                        onClick={this._prev.bind(this)}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this._next.bind(this)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Create account"
                        : "Next"}
                    </Button>
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

export default withStyles(styles)(CreateUser);
