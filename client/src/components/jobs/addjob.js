import React, { Component } from "react";
import { withRouter } from "react-router";
import JobForm from "./jobform.js";

//  This component will render as a child of home on the path /jobs/%jobid/edit
//  It will present the user with a form that allows them to create a new job.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r20F6
class AddJob extends Component {
  render() {
    return (
      <div>
        <JobForm mode="create" />
      </div>
    );
  }
}

export default withRouter(AddJob);
