import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the path /invoices
//It will show a paginated list view of invoice cards.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rDD59
class Invoices extends Component {
  render() {
    return (
      <div>
        <p>INVOICE PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Invoices);
