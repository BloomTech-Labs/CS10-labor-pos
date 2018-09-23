import React, { Component } from "react";
import gql from "graphql-tag";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";

//The mutation that Apollo will send on form submit
const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $email: String!
    $businessName: String!
    $city: String!
    $firstName: String!
    $lastName: String!
    $state: String!
    $streetAddress: String!
    $zipcode: String!
  ) {
    createUser(
      username: $username
      password: $password
      email: $email
      businessName: $businessName
      city: $city
      firstName: $firstName
      lastName: $lastName
      state: $state
      streetAddress: $streetAddress
      zipcode: $zipcode
    ) {
      user {
        id
      }
    }
  }
`;

//The list of options for our states pulldown menu
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

//This component will be rendered inside a modal on landingpage
class NewContractor extends Component {
  state = {
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    zipcode: "",
    city: "",
    state: "Alabama"
  };

  //This method keeps the state updated with the current contents of the input fields
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
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
      <div>
        {/*The mutation component wraps the form and uses its contents to fill in the mutation it sends*/}
        <Mutation
          mutation={CREATE_USER}
          onCompleted={data => this._confirm(data)}
        >
          {(createUser, { loading, error, data }) => (
            <div>
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
                <TextField
                  id="field-firstName"
                  label="First Name"
                  name="firstName"
                  className={"modal_field"}
                  value={firstName}
                  onChange={this.handleChange("firstName")}
                  margin="normal"
                />
                <TextField
                  id="field-lastName"
                  label="Last Name"
                  name="lastName"
                  className={"modal_field"}
                  value={lastName}
                  onChange={this.handleChange("lastName")}
                  margin="normal"
                />
                <TextField
                  id="field-businessName"
                  label="Business Name"
                  name="businessName"
                  className={"modal_field"}
                  value={businessName}
                  onChange={this.handleChange("businessName")}
                  margin="normal"
                />
                <TextField
                  id="field-streetAddress"
                  label="Street Address"
                  name="streetAddress"
                  className={"modal_field"}
                  value={streetAddress}
                  onChange={this.handleChange("streetAddress")}
                  margin="normal"
                />
                <TextField
                  id="field-city"
                  label="City"
                  name="city"
                  className={"modal_field"}
                  value={city}
                  onChange={this.handleChange("city")}
                  margin="normal"
                />
                <TextField
                  id="field-state"
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
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="field-zipcode"
                  label="Zip Code"
                  name="zipcode"
                  className={"modal_field"}
                  value={zipcode}
                  onChange={this.handleChange("zipcode")}
                  margin="normal"
                />
                <Button type="submit">Finish Account Creation</Button>
              </form>
              {loading && <p> Saving business information</p>}
              {(data || error) && <p> Noooooooo or yes.</p>}
            </div>
          )}
        </Mutation>
      </div>
    );
  }

  //This calls the method passed down from the parent component
  _confirm = async data => {
    this.props.modalDone();
  };
}

export default withRouter(NewContractor);
