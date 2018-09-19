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
        <Button href="/jobs">Jobs</Button>
        <Divider />
        <Button onClick={this.props.logout}>Logout</Button>
        <Divider />
        <Typography>other thingy</Typography>
      </div>
    );
  }
}

export default withRouter(SideNav);
