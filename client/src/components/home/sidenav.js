import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

class SideNav extends Component {
  render() {
    return (
      <div>
        <div />
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
        <Button onClick={this.props.logout}>Logout</Button>
      </div>
    );
  }
}

export default withRouter(SideNav);
