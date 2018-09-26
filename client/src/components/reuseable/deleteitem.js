import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import {
  DELETE_JOB,
  DELETE_NOTE,
  DELETE_PART,
  DELETE_TAG
} from "../../mutations";

//  This component renders as a child of many components
//  It presents the user with a message asking if they are sure
//  they want to delete the relevant item, and cancel and delete
//  buttons.

//  PROPS:
//    item: the object that may be deleted
//    type: the type of the item
//    cancelDelete: a method to stop showing the modal
//    after_path: the path to be rendered after deletion.

class DeleteItem extends Component {
  _confirm = () => {
    this.props.cancelDelete();
    window.location.reload();
    this.props.history.push(this.props.after_path);
  };
  render() {
    let name = "";
    let chosen_mutation = "";
    switch (this.props.type) {
      case "job":
        name = this.props.item.name;
        chosen_mutation = DELETE_JOB;
        break;
      case "part":
        name = this.props.item.name;
        chosen_mutation = DELETE_PART;
        break;
      case "note":
        name = this.props.item.title;
        chosen_mutation = DELETE_NOTE;
        break;
      case "tag":
        name = this.props.item.name;
        chosen_mutation = DELETE_TAG;
        break;
      default:
        break;
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

export default withRouter(DeleteItem);
