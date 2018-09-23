import React, { Component } from "react";
import { withRouter } from "react-router";

// This component renders as a child of clientview when not editing
// the client (exact path is /clients/%clientid)
// It presents the user with the clients information from querying
// the backend.
class ClientInfo extends Component {
  render() {
    return (
      <div>
        <p>CLIENTINFO PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(ClientInfo);
