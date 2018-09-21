import React, { Component } from "react";
import { Divider, Button } from "@material-ui/core";
import { withRouter } from "react-router";

//This is the side nav component that renders in the nav drawer in the home component
class SideNav extends Component {
  render() {
    return (
      <div>
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est tags would have a smaller create tag button under it.*/}
        <Divider />
        <Button href="/">Home</Button>
        <Divider />
        <Button href="/clients">Clients</Button>
        <Divider />
        <Button href="/jobs">Jobs</Button>
        <Divider />
        <Button href="/notes">Notes</Button>
        <Divider />
        <Button href="/tags">Tags</Button>
        <Divider />
        <Button href="/parts">Parts</Button>
        <Divider />
        <Button href="/invoices">Invoices</Button>
        <Divider />
        <Button href="/settings">Settings</Button>
        <Divider />
        <Button onClick={this.props.logout}>Logout</Button>
      </div>
    );
  }
}

export default withRouter(SideNav);
