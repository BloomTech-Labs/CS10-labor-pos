import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the
// /notes route when the user is logged in.
class Notes extends Component {
  render() {
    return (
      <div>
        <p>NOTE PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Notes);
