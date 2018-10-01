import React, { Component } from "react";
import { withRouter } from "react-router";

//The edit client component renders as a child of home on the path
// /client/:id/edit.  It presents the user with a prepopulated form to submit
// a mutation for an updated client.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rE2B1
class EditClient extends Component {
  render() {
    return (
      <div>
        <p>EDITCLIENT PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(EditClient);
