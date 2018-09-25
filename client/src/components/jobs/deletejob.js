import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//This component will render as a child of either jobcard or jobview
//it will be in a modal for both, and ask the user for confirmation
//Before sending the delete mutation.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
//https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9

const DELETE_JOB = gql`
  mutation($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;

class DeleteJob extends Component {
  _confirm = () => {
    this.props.cancelDelete();
    window.location.reload();
  };
  render() {
    return (
      <div>
        <h5>Are you sure you want to delete {this.props.jobName}?</h5>
        <Mutation
          mutation={DELETE_JOB}
          variables={{ id: this.props.jobId }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <Button onClick={mutation} type="submit">
              Delete
            </Button>
          )}
        </Mutation>
        <Button onClick={this.props.cancelDelete}>Cancel</Button>
      </div>
    );
  }
}

export default withRouter(DeleteJob);
