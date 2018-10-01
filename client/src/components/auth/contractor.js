import React, { Component } from "react";
import { withRouter } from "react-router";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../mutations";
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography
} from "@material-ui/core";

const states = [
  {
    value: "Alabama",
    label: "AL"
  },
  {
    value: "Alaska",
    label: "AK"
  },
  {
    value: "Arizona",
    label: "AZ"
  },
  {
    value: "Arkansas",
    label: "AR"
  },
  {
    value: "California",
    label: "CA"
  },
  {
    value: "Connecticut",
    label: "CT"
  },
  {
    value: "Colorado",
    label: "CO"
  },
  {
    value: "District of Columbia",
    label: "DC"
  },
  {
    value: "Delaware",
    label: "DE"
  },
  {
    value: "Florida",
    label: "FL"
  },
  {
    value: "Georgia",
    label: "GA"
  },
  {
    value: "Hawaii",
    label: "HI"
  },
  {
    value: "Idaho",
    label: "ID"
  },
  {
    value: "Illinois",
    label: "IL"
  },
  {
    value: "Indiana",
    label: "IN"
  },
  {
    value: "Iowa",
    label: "IA"
  },
  {
    value: "Kansas",
    label: "KS"
  },
  {
    value: "Kentucky",
    label: "KY"
  },
  {
    value: "Louisiana",
    label: "LA"
  },
  {
    value: "Maine",
    label: "ME"
  },
  {
    value: "Maryland",
    label: "MD"
  },
  {
    value: "Massachusetts",
    label: "MA"
  },
  {
    value: "Michigan",
    label: "MI"
  },
  {
    value: "Minnesota",
    label: "MN"
  },
  {
    value: "Mississippi",
    label: "MS"
  },
  {
    value: "Missouri",
    label: "MO"
  },
  {
    value: "Montana",
    label: "MT"
  },
  {
    value: "Nebraska",
    label: "NE"
  },
  {
    value: "Nevada",
    label: "NV"
  },
  {
    value: "New Hampshire",
    label: "NH"
  },
  {
    value: "New Jersey",
    label: "NJ"
  },
  {
    value: "New Mexico",
    label: "NM"
  },
  {
    value: "New York",
    label: "NY"
  },
  {
    value: "North Carolina",
    label: "NC"
  },
  {
    value: "North Dakota",
    label: "ND"
  },
  {
    value: "Ohio",
    label: "OH"
  },
  {
    value: "Oklahoma",
    label: "OK"
  },
  {
    value: "Oregon",
    label: "OR"
  },
  {
    value: "Pennsylvania",
    label: "PA"
  },
  {
    value: "Rhode Island",
    label: "RI"
  },
  {
    value: "South Carolina",
    label: "SC"
  },
  {
    value: "South Dakota",
    label: "SD"
  },
  {
    value: "Tennessee",
    label: "TN"
  },
  {
    value: "Texas",
    label: "TX"
  },
  {
    value: "Utah",
    label: "UT"
  },
  {
    value: "Vermont",
    label: "VT"
  },
  {
    value: "Virginia",
    label: "VA"
  },
  {
    value: "Washinton",
    label: "WA"
  },
  {
    value: "West Virginia",
    label: "WV"
  },
  {
    value: "Wisconsin",
    label: "WI"
  },
  {
    value: "Wyoming",
    label: "WY"
  },
  {
    value: "Puerto Rico",
    label: "PR"
  },
  {
    value: "Virgin Islands",
    label: "VI"
  },
  {
    value: "Guam",
    label: "GU"
  }
];

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
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    console.log("Contractor props", this.props);
    console.log("Contractor state", this.state);
    const {
      businessName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode
    } = this.state;
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Address
        </Typography>
        <Mutation mutation={CREATE_USER} onCompleted={() => this._confirm()}>
          {(createUser, { loading, error, data }) => (
            <form
              onSubmit={event => {
                event.preventDefault();
                createUser({
                  variables: {
                    businessName: businessName,
                    firstName: firstName,
                    lastName: lastName,
                    streetAddress: streetAddress,
                    zipcode: zipcode,
                    city: city,
                    state: state,
                    username: this.props.username,
                    password: this.props.password,
                    email: this.props.email
                  }
                });
                this.setState({
                  businessName: "",
                  firstName: "",
                  lastName: "",
                  streetAddress: "",
                  zipcode: "",
                  city: "",
                  state: ""
                });
              }}
            >
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="fname"
                    value={firstName}
                    onChange={this.handleChange("firstName")}
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
                    value={lastName}
                    onChange={this.handleChange("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="businessName"
                    label="Business Name"
                    name="businessName"
                    value={businessName}
                    onChange={this.handleChange("businessName")}
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
                    value={streetAddress}
                    onChange={this.handleChange("streetAddress")}
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
                    value={city}
                    onChange={this.handleChange("city")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    select
                    label="State"
                    name="state"
                    className={"modal_field"}
                    value={state}
                    onChange={this.handleChange("state")}
                    SelectProps={{
                      MenuProps: {
                        className: "Mister Menu"
                      }
                    }}
                    helperText="State"
                    margin="normal"
                  >
                    {states.map(state => (
                      <MenuItem key={state.label} value={state.label}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipcode"
                    name="zipcode"
                    label="Zipcode / Postal code"
                    fullWidth
                    autoComplete="postal-code"
                    value={zipcode}
                    onChange={this.handleChange("zipcode")}
                  />
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
