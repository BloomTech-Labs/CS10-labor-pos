import React, { Component } from "react";
import { withRouter } from "react-router";
import InjectedCheckoutForm from './checkoutform';

//This component will render on the /settings route when the user is logged in
//It is a child of the home component.
//It presents the user with forms that allow them to view and edit their user
//information and settings.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rFA17
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
