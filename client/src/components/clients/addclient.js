import React, { Component } from "react";
import { withRouter } from "react-router";
import ClientForm from "./clientform.js";

//  The add client component renders as a child of home on the path
//  /client/create.  It presents the user with a form to submit
//  a mutation for a new client.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rE2B1
class AddClient extends Component {
  render() {
    return (
      <div>
        <ClientForm mode="create" />
      </div>
    );
  }
}

export default withRouter(AddClient);
