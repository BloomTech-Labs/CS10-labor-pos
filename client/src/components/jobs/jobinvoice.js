import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the path /jobs/%jobid/invoice
//It will present the user with a preview of the generated invoice as well
//as buttons to edit, cancel, or send the invoice.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rA6BD
class JobInvoice extends Component {
  render() {
    return (
      <div>
        <p>JOBINVOICE PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(JobInvoice);
