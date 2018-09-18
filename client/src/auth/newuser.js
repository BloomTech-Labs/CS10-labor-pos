import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import gql from "graphql-tag";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

const SIGNUP_MUTATION = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      user {
        id
        username
      }
    }
  }
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

class NewUser extends Component {
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

  render() {
    const {
      businessName,
      firstName,
      lastName,
      email,
      streetAddress,
      zipcode,
      city,
      state
    } = this.state;

    return (
      <div>
        <TextField
          id="field-username"
          label="User Name"
          className={"modal_field"}
          value={this.state.username}
          onChange={this.handleChange("username")}
          margin="normal"
        />
        <TextField
          id="field-password"
          label="Password"
          className={"modal_field"}
          value={this.state.password}
          onChange={this.handleChange("password")}
          margin="normal"
          type="password"
        />
        <TextField
          id="field-email"
          label="Email"
          className={"modal_field"}
          value={this.state.email}
          onChange={this.handleChange("email")}
          margin="normal"
        />

        <Button onClick={this.props.myMethod}>Submit</Button>
      </div>
    );
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.tokenAuth.token : data.signup;
    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default NewUser;
