import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /parts/%partid route when the user is logged in
//It is a child of the home component.
//It will present the user with details about the individual part, as well as
//a form to edit it and a paginated list of tags applied to it.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r773D
class PartView extends Component {
  render() {
    return (
      <div>
        <p>PARTVIEW PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(PartView);
