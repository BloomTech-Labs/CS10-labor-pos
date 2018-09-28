import React, { Component } from "react";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { CREATE_USER } from "../../mutations";
import { STATE_LIST } from "../../constants.js";

//This component will be rendered inside a modal on landingpage
class NewContractor extends Component {
  state = {
    businessName: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    zipcode: "",
    city: "",
    state: "AL"
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
        <Mutation mutation={CREATE_USER} onCompleted={() => this._confirm()}>
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
                  {STATE_LIST.map(state => (
                    <MenuItem key={state.label} value={state.label}>
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
  _confirm = async () => {
    this.props.modalDone();
  };
}

export default withRouter(NewContractor);
