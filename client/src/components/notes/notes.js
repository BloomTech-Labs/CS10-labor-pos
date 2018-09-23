import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the
// /notes route when the user is logged in.
//It presents the user with a paginated list of cards
//for all notes.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r46CE
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
