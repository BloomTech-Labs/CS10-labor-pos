import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the path /jobs/%jobid
//It will present the user with the job info from the database as well as
//paginated lists of associated notes, parts, and tags, and an invoice
//generation button.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9
class JobView extends Component {
  render() {
    return (
      <div>
        <p>JOBVIEW PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(JobView);
