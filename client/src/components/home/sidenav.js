import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  MenuItem,
  withStyles,
  Avatar,
  FormControl,
  RadioGroup,
  Radio,
  Hidden,
  Typography
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore.js";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
import classNames from "classnames";

//This is the side nav component that renders in the nav drawer in the home component
class SideNav extends Component {
  state = {
    expanded: false
  };

  handleChange = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  render() {
    const { classes } = this.props;
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    const path = this.props.location.pathname;
    return (
      <div className={classNames(classes.sidenav, classes.sidenavFull)}>
        {/*TODO: These buttons can be in routes to dynamically display based on what is needed
        for the current parth
        ALSO: I would like to have sub-buttons under each category that lead to the sub-paths
        id est client would have a smaller create client button under it.*/}
        <Link to="/">
          <MenuItem selected={path === "/"} className={classes.nav_menu}>
            <Avatar
              alt="Raccoon with a gold bowtie"
              src={require("../../racoonbowtie.svg")}
              className={classes.image}
            />
            <Typography className={classes.typography_menu}>
              contractAlchemy
            </Typography>
          </MenuItem>{" "}
        </Link>
        <Link to="/clients">
          <MenuItem>
            <Typography className={classes.typography_menu}>
              Client List
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem selected={path.includes("createclient")}>
          <Link to="/createclient">
            <Typography className={classes.typography_menu}>
              Add Client
            </Typography>
          </Link>
        </MenuItem>{" "}
        <Link to="/jobs">
          <MenuItem>
            <Typography className={classes.typography_menu}>
              Job List
            </Typography>
          </MenuItem>{" "}
        </Link>
        <Link to="/notes">
          <MenuItem>
            <Typography className={classes.typography_menu}>
              Note List
            </Typography>
          </MenuItem>{" "}
        </Link>
        <Link to="/createnote">
          <MenuItem selected={path.includes("createnote")}>
            <Typography className={classes.typography_menu}>
              Add Note
            </Typography>
          </MenuItem>{" "}
        </Link>
        <Link to="/settings">
          <MenuItem selected={path.includes("settings")}>
            <Typography className={classes.typography_menu}>
              Settings
            </Typography>
          </MenuItem>{" "}
        </Link>
        <Link to="/billing">
          {" "}
          <MenuItem selected={path.includes("billing")}>
            <Typography className={classes.typography_menu}>Billing</Typography>
          </MenuItem>{" "}
        </Link>
        <Hidden xsUp={!user_premium}>
          <ExpansionPanel
            onChange={this.handleChange}
            className={classes.sidenav}
            style={{
              position: "unset",
              boxShadow: "none"
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              style={{
                padding: "0",
                margin: "0"
              }}
            >
              <MenuItem style={{ width: "100%" }}>
                <Typography className={classes.typography_menu}>
                  Themes
                </Typography>{" "}
              </MenuItem>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
                    label="default"
                  />
                  <FormControlLabel
                    value="desk"
                    control={<Radio />}
                    label="Desk"
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
                    value="darkgold"
                    control={<Radio />}
                    label="Dark Gold"
                  />
                  <FormControlLabel
                    value="banana"
                    control={<Radio />}
                    label="Banana"
                  />
                  <FormControlLabel
                    value="greyscale"
                    control={<Radio />}
                    label="Greyscale"
                  />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Hidden>
        <MenuItem onClick={this.props.logout} styling={{ position: "inherit" }}>
          <Typography className={classes.typography_menu}>Logout</Typography>
        </MenuItem>
        {/*The below switch controls light and dark theming by communicating with the App component.
            The current theme is also saved on local storage so it will persist between reloads.*/}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SideNav));
