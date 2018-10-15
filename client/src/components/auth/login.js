import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { SIGNIN_MUTATION } from "../../mutations";
import { Button, Grid, Typography, Paper, withStyles } from "@material-ui/core";
import TextField from "../material-ui/textfield";
import { styles } from "../material-ui/styles";
import { Formik, Field, Form } from "formik";
const Yup = require("yup");

const LoginSchema = Yup.object().shape({
  username: Yup.string("Username is required")
    .max(150, "Username must be under 150 characters")
    .required("Username is a required field"),
  password: Yup.string().required("Password is a required field")
});

//The login component, to be rendered in a modal at the landing page
class Login extends Component {
  render() {
    const { classes } = this.props;
    let user = {
      username: "",
      password: ""
    };

    return (
      <Formik
        initialValues={{
          username: user.username,
          password: user.password
        }}
        validationSchema={LoginSchema}
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        {({ values, isValid }) => {
          return (
            <Mutation
              mutation={SIGNIN_MUTATION}
              onCompleted={data => this._confirm(data)}
            >
              {(tokenAuth, { loading, error }) => (
                <Paper>
                  <Typography variant="display1" align="center">
                    Log In
                  </Typography>

                  <Form
                    onSubmit={event => {
                      event.preventDefault();
                      let user_variables = {
                        username: values.username,
                        password: values.password
                      };
                      tokenAuth({
                        variables: user_variables
                      });
                    }}
                  >
                    <Grid container>
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <Field
                          value={values.username}
                          component={TextField}
                          placeholder="Username"
                          name="username"
                          label="Username"
                          fullWidth={true}
                          required
                        />
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <Field
                          value={values.password}
                          type="password"
                          component={TextField}
                          placeholder="Password"
                          name="password"
                          label="password"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={12}>
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
                              disabled={!isValid}
                              type="submit"
                              className={classes.padded_button}
                            >
                              Login
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Paper>
              )}
            </Mutation>
          );
        }}
      </Formik>
    );
  }

  //This method runs after the mutation has received an answer
  _confirm = async data => {
    const { token } = data.tokenAuth;
    this._saveUserData(token);
    // Go to the root route
    this.props.history.push("/");
    // Now that we're done with it, close the modal containing this component.
    // this.props.modalDone();
  };

  //Keep our login token on local storage for later use
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default withRouter(withStyles(styles)(Login));
