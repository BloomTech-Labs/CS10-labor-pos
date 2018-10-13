import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Settings,
  Billing,
  AddPart,
  PartView,
  Notes,
  NoteView,
  AddNote,
  Jobs,
  JobView,
  JobInvoice,
  EditJob,
  SideNav,
  Start,
  Clients,
  AddClient,
  ClientView,
  EditClient,
  EditPart,
  EditNote
} from "../../components";
import { Route } from "react-router-dom";
import {
  Hidden,
  IconButton,
  Drawer,
  Paper,
  Grid,
  withStyles
} from "@material-ui/core";
import { styles } from "../material-ui/styles.js";
import MenuIcon from "@material-ui/icons/Menu";

//The home component is a container component that renders when the user is logged in and displays different
//content depending on the current route.
class Home extends Component {
  //This method destroys the auth token in local storage and this logs the user out.
  logout = () => {
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
    this.props.login(); // this method is passed from LandingPage and ensures the login modal opens
  };

  //The mobileOpen variable on state tracks whether the navigation drawer is open in small screen mode.
  state = {
    mobileOpen: false
  };

  //This method is used in small screen mode to toggle the apperance of the nav drawer.
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
        {/*This little fellow here is the button to toggle the nav drawer in small screen mode.*/}
        <Grid container>
          <Grid item xs={1}>
            <IconButton
              color="inherit"
              aria-label="Open sidenav"
              onClick={this.handleDrawerToggle}
              className="mr-auto"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11} />
        </Grid>
        {/*There are two Drawer components because one is hidden at any given time for responsiveness
        This is the drawer that displays in the small view (Baby Drawer)
        It is toggleable.*/}
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            className="sidenav"
            ModalProps={{
              keepMounted: true
            }}
          >
            <SideNav
              logout={this.logout}
              themeControlMethod={this.props.themeControlMethod}
              theme_string={this.props.theme_string}
            />
          </Drawer>
        </Hidden>
        {/*This is the drawer that displays in the large view. (Papa Drawer)
        It is permanently open.*/}
        <Hidden smDown implementation="css">
          <Drawer className="sidenav" variant="permanent" open>
            <SideNav
              logout={this.logout}
              themeControlMethod={this.props.themeControlMethod}
              theme_string={this.props.theme_string}
            />
          </Drawer>
        </Hidden>
        {/*These are the routes that render different content components depending on the
        current path.*/}
        <main>
          <Paper className={classes.main_content}>
            <Route exact path="/" component={Start} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/createclient" component={AddClient} />
            <Route exact path="/clients/:id" component={ClientView} />
            <Route exact path="/clients/:id/edit" component={EditClient} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/jobs/:id" component={JobView} />
            <Route exact path="/jobs/:id/invoice" component={JobInvoice} />
            <Route exact path="/jobs/:id/edit" component={EditJob} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/createnote" component={AddNote} />
            <Route exact path="/notes/:id" component={NoteView} />
            <Route exact path="/notes/:id/edit" component={EditNote} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/createpart" component={AddPart} />
            <Route exact path="/parts/:id" component={PartView} />
            <Route exact path="/parts/:id/edit" component={EditPart} />
          </Paper>
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Home));
