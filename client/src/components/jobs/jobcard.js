import React, { Component } from "react";
import { withRouter } from "react-router";
import { Create, Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./jobcard.css";

//This component will render as a child of the jobs component
//It presents a small area of preview information for an individual job
//Displays the job name as well as edit and delete buttons

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class JobCard extends Component {
  render() {
    return (
      <div className="job_card">
        <div className="job_card_icons">
          <IconButton href={`/jobs/${this.props.job.id}/edit`}>
            <Create />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </div>
        <h4 className="job_card_name">{this.props.job.name}</h4>
      </div>
    );
  }
}

export default withRouter(JobCard);
