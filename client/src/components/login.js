import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNIN_MUTATION = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    password: "",
    username: ""
  };

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

  _confirm = async data => {
    const { token } = this.state.login ? data.tokenAuth.token : data.signup;
    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
