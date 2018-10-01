import React, { Component } from "react";
import { withRouter } from "react-router";
import PartForm from "./partform.js";

//This component will render on the /parts/create route when the user is logged in
//It is a child of the home component.
//It will present the user with form fields to create a new part.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r29EA
class AddPart extends Component {
  render() {
    return (
      <div>
        <p>ADDPART PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(AddPart);
