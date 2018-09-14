import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';


const SIGNUP_MUTATION = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      user {
        id
        username
      }
    }
  }
  mutation createContractor($userId: ID!, $businessName: String!, $city: String!, $email: String!, $firstName: String!, $lastName: String!, $state: String!, $streetAddress: String!, $zipcode: String!) {
    createContractor(userId: $userId, businessName: $businessName, city: $city, email: $email, firstName: $firstName, lastName: $lastName, state: $state, streetAddress: $streetAddress, zipcode: $zipcode) {
      contractorField {
        firstName
      }
    }
  }`

const SIGNIN_MUTATION = gql`
  mutation SignInMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
  `


class Login extends Component {
  state = {
    login: true,
    password: '',
    username: '',
    email: '',
  }

  render() {
    const { login, email, username, password } = this.state
    return (
      <div>
        <h4 className="login">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
          )}
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
            mutation={login ? SIGNIN_MUTATION : SIGNUP_MUTATION}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.tokenAuth.token : data.signup
    this._saveUserData(token)
    this.props.history.push('/')
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login