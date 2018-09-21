import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render as a child of home on the path /jobs/%jobid/edit
//It will present the user with a prepopulated form and allow them to edit and
//submit the job information.
//MAY END UP BEING MERGED WITH CREATEJOB
//(or maybe both will be wrappers for a jobform component)

//https://balsamiq.cloud/sc1hpyg/po5pcja/r20F6
class EditJob extends Component {
  render() {
    return (
      <div>
        <p>EDITJOB PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(EditJob);
