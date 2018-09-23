import React, { Component } from "react";
import { withRouter } from "react-router";

//This component will render on the /billing route when the user is logged in
//It is a child of the home component.
//It presents the user with forms that allow them to PAY US MONEY!

//https://balsamiq.cloud/sc1hpyg/po5pcja/rE4AA
class Settings extends Component {
  render() {
    return (
      <div>
        <p>SETTINGS PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(Settings);
