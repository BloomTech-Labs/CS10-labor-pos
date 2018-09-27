import React, { Component } from "react";
import {
  Divider,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./sidenav.css";

//This is the side nav component that renders in the nav drawer in the home component
class SideNav extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  render() {
    const { expanded } = this.state;
    return (
      <div className="controlled-nav-accordion">
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est tags would have a smaller create tag button under it.*/}
        <Divider />
        <Link to="/">
          <Button>Home</Button>
        </Link>

        <ExpansionPanel
          expanded={expanded === "clientpanel"}
          onChange={this.handleChange("clientpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Clients</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/clients">
              <Button>View</Button>
            </Link>
            <Link to="/createclient">
              <Button>Create</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "jobpanel"}
          onChange={this.handleChange("jobpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Jobs</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/jobs">
              <Button>View</Button>
            </Link>
            <Link to="/createjob">
              <Button>Create</Button>
            </Link>
            <Link to="/invoices">
              <Button>Invoices</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "notepanel"}
          onChange={this.handleChange("notepanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Notes</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/notes">
              <Button>View</Button>
            </Link>
            <Link to="/createnote">
              <Button>Create</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "tagpanel"}
          onChange={this.handleChange("tagpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Tags</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/tags">
              <Button>View</Button>
            </Link>
            <Link to="/createtag">
              <Button>Create</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "partpanel"}
          onChange={this.handleChange("partpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Parts</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/parts">
              <Button>View</Button>
            </Link>
            <Link to="/createpart">
              <Button>Create</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "settingspanel"}
          onChange={this.handleChange("settingspanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Settings</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/settings">
              <Button>Main</Button>
            </Link>
            <Link to="/billing">
              <Button>Billing</Button>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button onClick={this.props.logout}>Logout</Button>
        <Divider />
      </div>
    );
  }
}

export default withRouter(SideNav);
