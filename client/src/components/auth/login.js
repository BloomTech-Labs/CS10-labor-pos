import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";

//The mutation to be used by graphql to log in
const SIGNIN_MUTATION = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

//The login component, to be rendered in a modal at the landing page
class Login extends Component {
  //The component stores the contents of its input fields on state.
  state = {
    password: "",
    username: ""
  };

  //TODO: make this component out of materialui stuff
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h4 className="Login" />
        <div className="flex flex-column">
          {/* {!login && (
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
          )} */}
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Your username"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div>
          {/*The mutation component will send our mutation to the backend using Apollo*/}
          <Mutation
            mutation={SIGNIN_MUTATION}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="button" onClick={mutation} type="submit">
                login
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }

  //This method runs after the mutation has received an answer
  _confirm = async data => {
    const { token } = data.tokenAuth;
    this._saveUserData(token);
    // Go to the root route
    this.props.history.push("/");
    // Now that we're done with it, close the modal containing this component.
    this.props.modalDone();
  };

  //Keep our login token on local storage for later use
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default withRouter(Login);
