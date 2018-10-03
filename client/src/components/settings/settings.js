import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grade } from "@material-ui/icons";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Paper,
  MenuItem,
  Button
} from "@material-ui/core";
import { Query } from "react-apollo";
import { GET_USER } from "../../queries.js";
import { STATE_LIST } from "../../constants";
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
          <Grid item xs={1} />
          <Grid item xs={6}>
            <Typography gutterBottom variant="title">
              Change Password
            </Typography>
            <Paper>
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    id="field-oldpass"
                    label="Current Password"
                    fullWidth
                    name="oldpass"
                    className={"modal_field"}
                    value={oldpass}
                    onChange={this.handleChange("oldpass")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <TextField
                    id="field-newpass"
                    label="New Password"
                    fullWidth
                    name="newpass"
                    className={"modal_field"}
                    value={newpass}
                    onChange={this.handleChange("newpass")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Typography gutterBottom variant="title">
              Business Name
            </Typography>
            <Paper>
              <Grid container>
                <Grid item xs={10}>
                  <TextField
                    id="field-businessName"
                    label="Business Name"
                    name="businessName"
                    fullWidth
                    className={"modal_field"}
                    value={businessName}
                    onChange={this.handleChange("businessName")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography gutterBottom variant="title">
              Name
            </Typography>
            <Paper>
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    id="field-firstName"
                    label="First Name"
                    name="firstName"
                    fullWidth
                    className={"modal_field"}
                    value={firstName}
                    onChange={this.handleChange("firstName")}
                    margin="normal"
                  />
                </Grid>
                <Grid xs={1} />
                <Grid item xs={5}>
                  <TextField
                    id="field-lastName"
                    label="Last Name"
                    fullWidth
                    name="lastName"
                    className={"modal_field"}
                    value={lastName}
                    onChange={this.handleChange("lastName")}
                    margin="normal"
                  />
                </Grid>
                <Grid xs={1} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography gutterBottom variant="title">
              Address
            </Typography>
            <Paper>
              <Grid container>
                <Grid item xs={11}>
                  <TextField
                    id="field-streetAddress"
                    label="Street Address"
                    fullWidth
                    name="streetAddress"
                    className={"modal_field"}
                    value={streetAddress}
                    onChange={this.handleChange("streetAddress")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4}>
                  <TextField
                    id="field-city"
                    label="City"
                    name="city"
                    fullWidth
                    className={"modal_field"}
                    value={city}
                    onChange={this.handleChange("city")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                  <TextField
                    id="state"
                    select
                    label="State"
                    name="state"
                    className={"modal_field"}
                    value={state}
                    fullWidth
                    onChange={this.handleChange("state")}
                  >
                    {STATE_LIST.map(state => (
                      <MenuItem key={state.label} value={state.label}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <TextField
                    id="field-zipcode"
                    label="Zipcode"
                    name="zipcode"
                    fullWidth
                    className={"modal_field"}
                    value={zipcode}
                    onChange={this.handleChange("zipcode")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={9} />
          <Grid item xs={3}>
            <Button>Save Changes</Button>
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
