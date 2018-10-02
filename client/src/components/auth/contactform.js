import React, { Component } from "react";
import { withRouter } from "react-router";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import "./contactform.css";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography
} from "@material-ui/core";

import { STATE_LIST } from "../../constants.js";

class ContactForm extends Component {
  state = {
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    zipcode: "",
    city: "",
    state: ""
  };

  render() {
    const {
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      username,
      email,
      password
    } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Address
        </Typography>
        <Mutation mutation={CREATE_USER} onCompleted={() => this._confirm()}>
          {(createUser, { loading, error, data }) => (
            <form onSubmit={this.props.submit(createUser)}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="fname"
                    value={this.props.firstName}
                    onChange={this.props.onChangeFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="lname"
                    value={this.props.lastName}
                    onChange={this.props.onChangeLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="businessName"
                    label="Business Name"
                    name="businessName"
                    fullWidth
                    value={this.props.businessName}
                    onChange={this.props.onChangeBusinessName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    autoComplete="street address"
                    value={this.props.streetAddress}
                    onChange={this.props.onChangeStreetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="city"
                    value={this.props.city}
                    onChange={this.props.onChangeCity}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    required
                    select
                    label="State"
                    name="state"
                    className={"modal_field"}
                    value={this.props.state}
                    fullWidth
                    onChange={this.props.onChangeState}
                    SelectProps={{
                      MenuProps: {
                        className: "Mister Menu"
                      }
                    }}
                    helperText="State"
                  >
                    {STATE_LIST.map(state => (
                      <MenuItem key={state.label} value={state.label}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="zipcode"
                    name="zipcode"
                    label="Zipcode / Postal code"
                    fullWidth
                    autoComplete="postal-code"
                    value={this.props.zipcode}
                    onChange={this.props.onChangeZipcode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="HELL">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="SignUpButon"
                    >
                      Finish Account Creation
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Mutation>
      </React.Fragment>
    );
  }

  _confirm = async () => {
    console.log(this);
  };
}

export default withRouter(ContactForm);
