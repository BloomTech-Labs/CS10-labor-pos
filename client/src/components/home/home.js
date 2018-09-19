import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router";
import Jobs from "../jobs/jobs";
import { Route } from "react-router-dom";

class Home extends Component {
  logout = () => {
    console.log(localStorage.auth_token);
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        We're home!
        <button onClick={this.logout}>Logout</button>
        <Route exact path="/jobs" component={Jobs} />
      </div>
    );
  }
}

export default withRouter(Home);
