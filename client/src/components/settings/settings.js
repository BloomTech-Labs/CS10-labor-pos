import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /settings route when the user is logged in
//It is a child of the home component.
class Settings extends Component {
  render() {
    return (
      <div>
        <p>SETTINGS PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Settings);
