import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router";

class Home extends Component {
  logout = () => {
    console.log(localStorage.auth_token);
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        One day, we'll call this home.
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Home);
