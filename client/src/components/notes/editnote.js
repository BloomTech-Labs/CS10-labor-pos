import React, { Component } from "react";
import { withRouter } from "react-router";
import NoteForm from "./noteform.js";

//  This component will render as a child of note view..
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
