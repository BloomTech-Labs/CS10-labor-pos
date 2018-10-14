import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { SIGNIN_MUTATION } from "../../mutations";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  withStyles
} from "@material-ui/core";
import { styles } from "../material-ui/styles";

//The login component, to be rendered in a modal at the landing page
class Login extends Component {
  //The component stores the contents of its input fields on state.
  state = {
    password: "",
    username: ""
  };

  //TODO: make this component out of materialui stuff
  render() {
    const { classes } = this.props;
    const { username, password } = this.state;
    return (
      <Paper>
        <Typography variant="display1" align="center">
          Log In
        </Typography>

        <form>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                label="Username"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} />
            <Grid item xs={10}>
              <TextField
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                label="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12}>
              <Mutation
                mutation={SIGNIN_MUTATION}
                variables={{ username, password }}
                onCompleted={data => this._confirm(data)}
              >
                {(mutation, { loading, error }) => (
                  <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={8}>
                      {error && (
                        <Typography color="error">{`error: ${error}`}</Typography>
                      )}
                      {loading && <Typography>Loading ...</Typography>}
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={event => {
                          event.preventDefault();
                          mutation();
                        }}
                        type="submit"
                        className={classes.padded_button}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Mutation>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </form>

        <div>
          {/*The mutation component will send our mutation to the backend using Apollo*/}
        </div>
      </Paper>
    );
  }

  //This method runs after the mutation has received an answer
  _confirm = async data => {
    const { token, user } = data.tokenAuth;
    this._saveUserData(token, user.id, user.premium);
    // Go to the root route
    this.props.history.push("/");
    // Now that we're done with it, close the modal containing this component.
    // this.props.modalDone();
  };

  //Keep our login token on local storage for later use
  _saveUserData = (token, id, premium) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("USER_ID", id);
    localStorage.setItem("USER_PREMIUM", premium);
  };
}

export default withRouter(withStyles(styles)(Login));
