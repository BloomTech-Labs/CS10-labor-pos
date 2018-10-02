import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grade } from "@material-ui/icons";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Paper
} from "@material-ui/core";
import { Query } from "react-apollo";
import { GET_USER } from "../../queries.js";
import jwt_decode from "jwt-decode";

//  This component will render on the /settings route when the user is logged in
//  It is a child of the home component.
//  It presents the user with forms that allow them to view and edit their user
//  information and settings.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rFA17
class Settings extends Component {
  state = {
    oldpass: "",
    newpass: "",
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    premium: "",
    paidUntil: "",
    username: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount = () => {
    this.setState({
      oldpass: "",
      newpass: "",
      businessName: this.props.user.businessName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      streetAddress: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zipcode: this.props.user.zipcode,
      premium: this.props.user.premium,
      paidUntil: this.props.user.paidUntil,
      username: this.props.user.username
    });
  };

  render() {
    const {
      oldpass,
      newpass,
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      premium,
      paidUntil,
      username
    } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography variant="display3">Settings</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <Grade />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    id="field-oldpass"
                    label="Current Password"
                    name="oldpass"
                    className={"modal_field"}
                    value={oldpass}
                    onChange={this.handleChange("oldpass")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="field-newpass"
                    label="New Password"
                    name="newpass"
                    className={"modal_field"}
                    value={newpass}
                    onChange={this.handleChange("newpass")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="field-businessName"
              label="Business Name"
              name="businessName"
              className={"modal_field"}
              value={businessName}
              onChange={this.handleChange("businessName")}
              margin="normal"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

class SettingsWrapper extends Component {
  render = () => {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const decoded_token = jwt_decode(localStorage.getItem("auth-token"));
          const user = data.allUsers.edges.filter(user => {
            return user.node.username === decoded_token.username;
          })[0].node;
          return <Settings user={user} />;
        }}
      </Query>
    );
  };
}

export default withRouter(SettingsWrapper);
