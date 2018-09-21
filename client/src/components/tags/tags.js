import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /tags route when the user is logged in
//It is a child of the home component.
class Tags extends Component {
  render() {
    return (
      <div>
        <p>TAG PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Tags);
