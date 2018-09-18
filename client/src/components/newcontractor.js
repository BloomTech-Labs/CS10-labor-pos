import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import gql from "graphql-tag";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

class NewContractor extends Component {
  state = {
    foo: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <p>This is a placeholder!</p>
      </div>
    );
  }
}

export default NewContractor;
