import React, { Component } from "react";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  MenuItem,
  withStyles,
  Avatar,
  FormControl,
  RadioGroup,
  Radio
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore.js";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
import classNames from "classnames";

//This is the side nav component that renders in the nav drawer in the home component
class SideNav extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => expanded => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const path = this.props.location.pathname;
    return (
      <div className={classNames(classes.sidenav, classes.sidenavFull)}>
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est client would have a smaller create client button under it.*/}
        <Divider className="sidenav" />
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
          className={classes.sidenav}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMore className="sidenav" />}
          >
            <MenuItem selected={path.includes("client")}>Clients</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classNames("sidenav", classes.nav_menu)}
          >
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
          className={classes.sidenav}
        >
          <ExpansionPanelSummary
            className="sidenav"
            expandIcon={<ExpandMore />}
          >
            <MenuItem
              selected={path.includes("job") || path.includes("invoice")}
            >
              Jobs
            </MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classNames("sidenav", classes.nav_menu)}
          >
            <Link to="/jobs">
              <MenuItem selected={path.includes("jobs")}>View</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "notepanel"}
          onChange={this.handleChange("notepanel")}
          className={classes.sidenav}
        >
          <ExpansionPanelSummary
            className="sidenav"
            expandIcon={<ExpandMore />}
          >
            <MenuItem selected={path.includes("note")}>Notes</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classNames("sidenav", classes.nav_menu)}
          >
            <Link to="/notes">
              <MenuItem selected={path.includes("notes")}>View</MenuItem>
            </Link>
            <Link to="/createnote">
              <MenuItem selected={path.includes("createnote")}>Create</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === "settingspanel"}
          onChange={this.handleChange("settingspanel")}
          className={classes.sidenav}
        >
          <ExpansionPanelSummary
            className="sidenav"
            expandIcon={<ExpandMore />}
          >
            <MenuItem
              selected={path.includes("settings") || path.includes("billing")}
            >
              Settings
            </MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classNames("sidenav", classes.nav_menu)}
          >
            <Link to="/settings">
              <MenuItem selected={path.includes("settings")}>Main</MenuItem>
            </Link>
            <Link to="/billing">
              <MenuItem selected={path.includes("billing")}>Billing</MenuItem>
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "themespanel"}
          onChange={this.handleChange("themespanel")}
          className={classes.sidenav}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <MenuItem>Themes</MenuItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.nav_menu}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                name="theme"
                className={classes.group}
                value={this.props.theme_string}
                onChange={this.props.themeControlMethod}
              >
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="Default"
                />
                <FormControlLabel
                  value="forest"
                  control={<Radio />}
                  label="Forest"
                />
                <FormControlLabel
                  value="ugly"
                  control={<Radio />}
                  label="Ugly"
                />
                <FormControlLabel
                  value="bluegrey"
                  control={<Radio />}
                  label="Blue Grey"
                />
                <FormControlLabel
                  value="banana"
                  control={<Radio />}
                  label="Banana"
                />
              </RadioGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        <Divider className="sidenav" />
        {/*The below switch controls light and dark theming by communicating with the App component.
            The current theme is also saved on local storage so it will persist between reloads.*/}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SideNav));
