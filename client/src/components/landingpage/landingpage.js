import React, { Component } from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  Card,
  withStyles,
  withMobileDialog,
  Paper
} from "@material-ui/core";
import { styles } from "../material-ui/styles.js";
import { Login, Home, CreateUser } from "../../components";
import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router";

// import ContactForm from "../../components/auth/contractor";

//This is the component for users who arrive at the site without being logged in.
//It renders path-insensitively; if the user is not logged in, any path will
//show this component
//It presents the user with information about our app and what it can do
//As well as the opportunity to log in or sign up.

//https://balsamiq.cloud/snv27r3/pb3k52z/r2278
class LandingPage extends Component {
  //This component uses its state to track some important variables.
  //Moving forward, as I see it, we have 3 options:
  //1. We can have state on many components and just store stuff where its used and needed,
  //if absolutely necessary passing things back up to parent components with methods
  //2. Use this state as a single source of truth for its child components via
  //"prop drilling"
  //3. Use context or something similar.
  constructor() {
    super();
    this.state = {
      login_modal: false,
      create_modal: false,
      contractor_modal: false,
      username: "",
      password: "",
      email: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  //This method is passed down to the user modal component
  //so that it can affect the state of this component.
  setUserInformation = info => {
    this.setState({
      username: info.username,
      password: info.password,
      email: info.email
    });
  };

  //This method is passed down to the contractor modal
  //The contractor modal uses it to close itself and open
  //the login modal.
  handleLogin = () => {
    this.setState({ login_modal: true, create_modal: false });
  };

  //This method is used to open the create user modal.
  handleCreateButton = () => {
    this.setState({ create_modal: true });
  };

  //This is a multipurpose method to close all modals.
  handleCloseModals = () => {
    this.setState({
      login_modal: false,
      contractor_modal: false,
      create_modal: false
    });
  };

  render() {
    const { classes, fullScreen } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    //If the user is authenticated, we render the home component instead.
    if (authToken) {
      return (
        <Home
          themeControlMethod={this.props.themeControlMethod}
          theme_string={this.props.theme_string}
          login={this.handleLogin}
        />
      );
    }
    //If the user is not authenticated, we go ahead and render this component.
    //TODO: make this actually present a case for using our app.
    else {
      return (
        <div>
          <Grid container>
            <Grid item xs={6} sm={9} md={10} />
            <Grid item xs={6} sm={3} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleLogin}
                className={classes.padded_button}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
          <div>
            <img
              alt="A golden raccoon logo"
              src={require("../../racoonbowtie.svg")}
              className={classes.image_large}
            />
            <div style={{ backgroundColor: "black", padding: "20px" }}>
              <Typography
                className={classes.typography_title_landing}
                variant="title"
              >
                Contract Alchemy:
                <br />
                Turning POS Into Gold
              </Typography>
              <Typography
                className={classes.typography_paragraph_landing}
                paragraph
              >
                {"Tired of balancing multiple projects?"} <br />
                {"Struggling to keep track of how much you’re owed from whom?"}
                <h2>{"Struggle no more!"}</h2>
                {
                  "At contractAlchemy, we're here to help you organize your contracts so you have more time to do the things you want to do."
                }
              </Typography>
              <Button
                className={classes.padded_button}
                variant="contained"
                color="primary"
                onClick={this.handleCreateButton}
              >
                Create Account
              </Button>
            </div>
            {/*We use material ui dialog components for our modals.*/}
            <Dialog
              fullScreen={fullScreen}
              open={this.state.login_modal}
              onClose={this.handleCloseModals}
              PaperProps={{ className: classes.dark_paper }}
            >
              <Paper className={classes.paper}>
                <Login modalDone={this.handleCloseModals} />
              </Paper>
            </Dialog>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.create_modal}
              onClose={this.handleCloseModals}
            >
              <Paper className={classes.dark_paper}>
                <CreateUser modalDone={this.handleLogin} />
              </Paper>
            </Dialog>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(withMobileDialog()(withStyles(styles)(LandingPage)));
