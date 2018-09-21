import React, { Component } from "react";
import { withRouter } from "react-router";

//The clients component renders as a child of the home component and displays a paginated list of client cards
//on path /clients
class Clients extends Component {
  render() {
    return (
      <div>
        <p>CLIENT PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Clients);
