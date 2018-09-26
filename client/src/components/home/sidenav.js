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
        <Button href="/">Home</Button>

        <ExpansionPanel
          expanded={expanded === "clientpanel"}
          onChange={this.handleChange("clientpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Button>Clients</Button>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Button href="/clients">View</Button>
            <Button href="/createclient">Create</Button>
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
            <Button href="/jobs">View</Button>
            <Button href="/createjob">Create</Button>
            <Button href="/invoices">Invoices</Button>
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
            <Button href="/notes">View</Button>
            <Button href="/createnote">Create</Button>
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
            <Button href="/tags">View</Button>
            <Button href="/createtag">Create</Button>
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
            <Button href="/parts">View</Button>
            <Button href="/createpart">Create</Button>
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
            <Button href="/settings">Main</Button>
            <Button href="/billing">Billing</Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button onClick={this.props.logout}>Logout</Button>
        <Divider />
      </div>
    );
  }
}

export default withRouter(SideNav);
