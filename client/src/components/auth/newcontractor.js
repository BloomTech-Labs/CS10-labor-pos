import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import gql from "graphql-tag";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

const CREATE_CONTRACTOR_MUTATION = gql`
  mutation createContractor(
    $userId: ID!
    $businessName: String!
    $city: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $state: String!
    $streetAddress: String!
    $zipcode: String!
  ) {
    createContractor(
      userId: $userId
      businessName: $businessName
      city: $city
      email: $email
      firstName: $firstName
      lastName: $lastName
      state: $state
      streetAddress: $streetAddress
      zipcode: $zipcode
    ) {
      contractorField {
        firstName
      }
    }
  }
`;

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

class NewContractor extends Component {
  state = {
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    zipcode: "",
    city: "",
    state: "Alabama"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <TextField
          id="field-firstName"
          label="First Name"
          className={"modal_field"}
          value={this.state.firstName}
          onChange={this.handleChange("firstName")}
          margin="normal"
          user
        />
        <TextField
          id="field-lastName"
          label="Last Name"
          className={"modal_field"}
          value={this.state.lastName}
          onChange={this.handleChange("lastName")}
          margin="normal"
        />
        <TextField
          id="field-businessName"
          label="Business Name"
          className={"modal_field"}
          value={this.state.businessName}
          onChange={this.handleChange("businessName")}
          margin="normal"
        />
        <TextField
          id="field-streetAddress"
          label="Street Address"
          className={"modal_field"}
          value={this.state.streetAddress}
          onChange={this.handleChange("streetAddress")}
          margin="normal"
        />
        <TextField
          id="field-city"
          label="City"
          className={"modal_field"}
          value={this.state.city}
          onChange={this.handleChange("city")}
          margin="normal"
        />
        <TextField
          id="field-state"
          select
          label="State"
          className={"modal_field"}
          value={this.state.state}
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
            <MenuItem key={state.value} value={state.value}>
              {state.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="field-zipcode"
          label="Zip Code"
          className={"modal_field"}
          value={this.state.zipcode}
          onChange={this.handleChange("zipcode")}
          margin="normal"
        />
        <Button onClick={this.props.myMethod}>Submit</Button>
      </div>
    );
  }
}

export default NewContractor;
