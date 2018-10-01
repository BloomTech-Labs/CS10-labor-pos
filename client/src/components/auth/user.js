import React, { Component } from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router";

class UserForm extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.save(this.state);
  };

  render() {
    const { username, password, email } = this.state;
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Account details
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                required
                name="username"
                label="Username"
                value={username}
                fullWidth
                autoComplete="username"
                onChange={this.handleChange("username")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                autoComplete="off"
                fullWidth
                onChange={this.handleChange("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={email}
                fullWidth
                onChange={this.handleChange("email")}
              />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(UserForm);
