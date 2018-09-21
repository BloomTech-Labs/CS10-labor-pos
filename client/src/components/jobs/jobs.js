import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the path /jobs
//It will present the user with a paginated list of job cards.
class Jobs extends Component {
  render() {
    return (
      <div>
        <p>JOB PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Jobs);
