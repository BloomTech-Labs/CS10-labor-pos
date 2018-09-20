import React, { Component } from "react";
import { withRouter } from "react-router";
import Jobs from "../jobs/jobs";
import Clients from "../clients/clients";
import "./home.css";
import Notes from "../notes/notes";
import Tags from "../tags/tags";
import Parts from "../parts/parts";
import Invoices from "../invoices/invoices";
import { Route } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import SideNav from "./sidenav";
import Start from "./start";

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
      <div className="d-flex flex-column">
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
          <div className="content_area">
            <Route exact path="/" component={Start} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/tags" component={Tags} />
            <Route exact path="/parts" component={Parts} />
            <Route exact path="/invoices" component={Invoices} />
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Home);
