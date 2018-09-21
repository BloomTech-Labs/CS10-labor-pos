import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /tags/create route when the user is logged in
//It is a child of the home component.
//It presents the user with a form to enter the title and description of a new tag.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r1473
class AddTag extends Component {
  render() {
    return (
      <div>
        <p>ADDTAG PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(AddTag);
