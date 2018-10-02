import React, { Component } from "react";
import {
  Divider,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Switch,
  MenuItem
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
    const path = this.props.location.pathname;
    return (
      <div className="controlled-nav-accordion">
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est tags would have a smaller create tag button under it.*/}
        <Divider />
        <Link to="/">
          <MenuItem selected={path === "/"}>Home</MenuItem>
        </Link>

        <ExpansionPanel
          expanded={expanded === "clientpanel"}
          onChange={this.handleChange("clientpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("client")}>Clients</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/clients">
              <MenuItem selected={path.includes("clients")}>View</MenuItem>
            </Link>
            <Link to="/createclient">
              <MenuItem selected={path.includes("createclient")}>
                Create
              </MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "jobpanel"}
          onChange={this.handleChange("jobpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("job")}>Jobs</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/jobs">
              <MenuItem selected={path.includes("jobs")}>View</MenuItem>
            </Link>
            <Link to="/createjob">
              <MenuItem selected={path.includes("createjob")}>Create</MenuItem>
            </Link>
            <Link to="/invoices">
              <MenuItem selected={path.includes("invoices")}>Invoices</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "notepanel"}
          onChange={this.handleChange("notepanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("note")}>Notes</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/notes">
              <MenuItem selected={path.includes("notes")}>View</MenuItem>
            </Link>
            <Link to="/createnote">
              <MenuItem selected={path.includes("createnote")}>Create</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "tagpanel"}
          onChange={this.handleChange("tagpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("tag")}>Tags</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/tags">
              <MenuItem selected={path.includes("tags")}>View</MenuItem>
            </Link>
            <Link to="/createtag">
              <MenuItem selected={path.includes("createtag")}>Create</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "partpanel"}
          onChange={this.handleChange("partpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("part")}>Parts</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/parts">
              <MenuItem selected={path.includes("parts")}>View</MenuItem>
            </Link>
            <Link to="/createpart">
              <MenuItem selected={path.includes("createpart")}>Create</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "settingspanel"}
          onChange={this.handleChange("settingspanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem
              selected={path.includes("settings") || path.includes("billing")}
            >
              Settings
            </MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="nav-menu-items">
            <Link to="/settings">
              <MenuItem selected={path.includes("settings")}>Main</MenuItem>
            </Link>
            <Link to="/billing">
              <MenuItem selected={path.includes("billing")}>Billing</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        <Divider />
        {/*The below switch controls light and dark theming by communicating with the App component.
            The current theme is also saved on local storage so it will persist between reloads.*/}
        <FormControlLabel
          control={
            <Switch
              checked={this.props.dark_theme}
              onChange={this.props.themeControlMethod("dark_theme")}
              value="dark_theme"
            />
          }
          label="Dark Theme"
        />
      </div>
    );
  }
}

export default withRouter(SideNav);
