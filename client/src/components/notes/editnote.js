import React, { Component } from "react";
import { withRouter } from "react-router";

//  This component will render as a child of home on the
//  /notes/:id/edit route when the user is logged in.
//  It presents the user with prepopulated form fields to update a note.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class EditNote extends Component {
  render() {
    return (
      <div>
        <p>EDITNOTE PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(EditNote);
