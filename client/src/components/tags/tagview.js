import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /tags/%tagid route when the user is logged in
//It is a child of the home component.
//It presents the user with the name and description of the tag, as well as
//paginated lists of the parts notes and jobs tagged with the current tag
//and a form with which the tag can be edited.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rA413
class Tags extends Component {
  render() {
    return (
      <div>
        <p>TAG PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Tags);
