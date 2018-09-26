import React, { Component } from "react";
import { withRouter } from "react-router";
import { Create, Delete } from "@material-ui/icons";
import { IconButton, Button, Dialog } from "@material-ui/core";
import { DeleteItem } from "../../components";
import "./jobcard.css";

//This component will render as a child of the jobs component
//It presents a small area of preview information for an individual job
//Displays the job name as well as edit and delete buttons

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class JobCard extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false
    };
  }

  handleDeleteButton = () => {
    this.setState({ deleting: true });
  };

  cancelDelete = () => {
    this.setState({ deleting: false });
  };

  render() {
    return (
      <div className="job_card">
        <div className="job_card_icons">
          <IconButton href={`/jobs/${this.props.job.id}/edit`}>
            <Create />
          </IconButton>
          <IconButton onClick={this.handleDeleteButton}>
            <Delete />
          </IconButton>
        </div>
        <h4 className="job_card_name">
          <Button href={`/jobs/${this.props.job.id}`}>
            {this.props.job.name}
          </Button>
        </h4>
        <Dialog
          open={this.state.deleting}
          onClose={this.cancelDelete}
          className="delete-modal"
        >
          <DeleteItem
            cancelDelete={this.cancelDelete}
            type="job"
            item={this.props.job}
          />
        </Dialog>
      </div>
    );
  }
}

export default withRouter(JobCard);
