import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//  This component renders as a child of many components
//  It presents the user with a message asking if they are sure
//  they want to delete the relevant item, and cancel and delete
//  buttons.

//  PROPS:
//    item: the object that may be deleted
//    type: the type of the item
//    cancelDelete: a method to stop showing the modal

const DELETE_JOB = gql`
  mutation($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;

class DeleteItem extends Component {
  _confirm = () => {
    this.props.cancelDelete();
  };
  render() {
    let name = "";
    let chosen_mutation = "";
    let after_path = "";
    switch (this.props.type) {
      case "job":
        name = this.props.item.name;
        chosen_mutation = DELETE_JOB;
        after_path = "/jobs";
    }
    return (
      <div>
        <h5>Are you sure you want to delete {name}?</h5>
        <Mutation
          mutation={chosen_mutation}
          variables={{ id: this.props.item.id }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <Button href={after_path} onClick={mutation} type="submit">
              Delete
            </Button>
          )}
        </Mutation>
        <Button onClick={this.props.cancelDelete}>Cancel</Button>
      </div>
    );
  }
}

export default withRouter(DeleteItem);
