import React, { Component } from "react";
import { withRouter } from "react-router";

// This component renders a s a child of home on the path
// /clients/%clientid.  It presents the user with all information
// about a given client, as well as paginated card for associated
// notes and jobs.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r4C62
class ClientView extends Component {
  render() {
    return (
      <div>
        <p>CLIENTVIEW PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(ClientView);
