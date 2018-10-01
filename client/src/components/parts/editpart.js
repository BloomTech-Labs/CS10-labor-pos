import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /parts/:id/edit route when the user is logged in
//It is a child of the home component.
//It will present the user with prepopulated form fields to update a part.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r29EA
class EditPart extends Component {
  render() {
    return (
      <div>
        <p>EDITPART PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(EditPart);
