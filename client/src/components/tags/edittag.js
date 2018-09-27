import React, { Component } from "react";
import { withRouter } from "react-router";

//  This component will render on the /tags/:id/edit route when the user is logged in
//  It is a child of the home component.
//  It presents the user with a prepopulated form to update a tag.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r1473
class EditTag extends Component {
  render() {
    return (
      <div>
        <p>EDITTAG PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(EditTag);
