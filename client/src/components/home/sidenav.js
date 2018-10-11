import React, { Component } from "react";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Switch,
  MenuItem,
  withStyles,
  Avatar
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";

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
    const { classes } = this.props;
    const { expanded } = this.state;
    const path = this.props.location.pathname;
    return (
      <div>
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est client would have a smaller create client button under it.*/}
        <Divider />
        <Link to="/" className={classes.sidenav_top}>
          <Avatar
            alt="A golden raccoon logo"
            src={require("../../goldracoon.png")}
            className={classes.image}
          />
          <MenuItem selected={path === "/"}>Home</MenuItem>
        </Link>

        <ExpansionPanel
          expanded={expanded === "clientpanel"}
          onChange={this.handleChange("clientpanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem selected={path.includes("client")}>Clients</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.nav_menu}>
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
            <MenuItem
              selected={path.includes("job") || path.includes("invoice")}
            >
              Jobs
            </MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.nav_menu}>
            <Link to="/jobs">
              <MenuItem selected={path.includes("jobs")}>View</MenuItem>
            </Link>
            <Link to="/createjob">
              <MenuItem selected={path.includes("createjob")}>Create</MenuItem>
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
          <ExpansionPanelDetails className={classes.nav_menu}>
            <Link to="/notes">
              <MenuItem selected={path.includes("notes")}>View</MenuItem>
            </Link>
            <Link to="/createnote">
              <MenuItem selected={path.includes("createnote")}>Create</MenuItem>
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
          <ExpansionPanelDetails className={classes.nav_menu}>
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
          <ExpansionPanelDetails className={classes.nav_menu}>
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

export default withRouter(withStyles(styles)(SideNav));
