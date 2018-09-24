import React, { Component } from "react";
// import gql from "graphql-tag";
import { TextField, Button } from "@material-ui/core";
// import { Mutation } from "react-apollo";
import { withRouter } from "react-router";

// const client = new ApolloClient({
//   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
// });

// client
//   .query({
//     query: gql`
//       {
//         users {
//           id
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// Old code from when we had the user and contractor tied together in a 1 to 1 relationship:
//The mutation that Apollo will send on form submit
// const CREATE_USER = gql`
//   mutation createUser($username: String!, $password: String!, $email: String!) {
//     createUser(username: $username, password: $password, email: $email) {
//       user {
//         id
//       }
//     }
//   }
// `;

//This component is rendered inside a modal on landing page
class NewUser extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  //This method keeps the state up to date with the input fields
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // This method sends form information from this component to the LandingPage component
  // so that it can pass the information down to the newcontractor component
  handleSubmit = event => {
    event.preventDefault();
    this.props.parentInfoMethod(this.state);
    this.props.modalDone();
    this.setState({ username: "", password: "", email: "" });
  };

  //
  render() {
    const { username, password, email } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="field-username"
            label="User Name"
            name="username"
            className={"modal_field"}
            value={username}
            onChange={this.handleChange("username")}
            margin="normal"
          />
          <TextField
            id="field-password"
            label="Password"
            name="password"
            className={"modal_field"}
            value={password}
            onChange={this.handleChange("password")}
            margin="normal"
            type="password"
          />
          <TextField
            id="field-email"
            label="Email"
            name="email"
            className={"modal_field"}
            value={email}
            onChange={this.handleChange("email")}
            margin="normal"
          />
          <Button type="submit">Create User</Button>
        </form>
      </div>
    );
  }

  // Old code from when we were separating the user and contractor models:
  // //parentInfoMethod is passed down from the landing page component to allow this component to send a user id up to its state
  // //
  // _confirm = async data => {
  //   this.props.parentInfoMethod(data.createUser.user.id);
  //   this.props.modalDone();
  // };
}

export default withRouter(NewUser);
