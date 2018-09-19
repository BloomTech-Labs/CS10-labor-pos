import React, { Component } from "react";
import { withRouter } from "react-router";
import Jobs from "../jobs/jobs";
import { Route } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import SideNav from "./sidenav";

class Home extends Component {
  logout = () => {
    console.log(localStorage.auth_token);
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  };

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    return (
      <div className="d-flex">
        <IconButton
          color="inherit"
          aria-label="Open sidenav"
          onClick={this.handleDrawerToggle}
          className="mr-auto"
        >
          <MenuIcon />
        </IconButton>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <SideNav logout={this.logout} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open>
            <SideNav logout={this.logout} />
          </Drawer>
        </Hidden>
        <main>
          <div />
          <Route exact path="/jobs" component={Jobs} />
        </main>
      </div>
    );
  }
}

export default withRouter(Home);
