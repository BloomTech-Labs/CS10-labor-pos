import React, { Component } from "react";
import { withRouter } from "react-router";

// This component renders as a child of clientview when editing
// the client (path is /clients/%clientid/edit)
// It presents the user with form fields to fill out client information.
// Then it sends a mutation on submit.
class ClientForm extends Component {
  render() {
    return (
      <div>
        <p>CLIENTFORM PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(ClientForm);
