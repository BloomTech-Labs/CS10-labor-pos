import React, { Component } from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router";

class UserForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
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
                value={this.props.username}
                fullWidth
                autoComplete="username"
                onChange={this.props.onChangeUsername}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={this.props.password}
                autoComplete="off"
                fullWidth
                onChange={this.props.onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={this.props.email}
                fullWidth
                onChange={this.props.onChangeEmail}
              />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(UserForm);
