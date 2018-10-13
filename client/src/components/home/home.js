import React, { Component } from "react";
import { withRouter } from "react-router";
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
import Loadable from "react-loadable";
import { Start, SideNav } from "../../components";

function Loading({ error }) {
  if (error) {
    return <p>{error}</p>;
  } else {
    return <h3>Loading...</h3>;
  }
}

const Settings = Loadable({
  loader: () => import("../../components/settings/settings.js"),
  loading: Loading
});

const Billing = Loadable({
  loader: () => import("../../components/billing/billing.js"),
  loading: Loading
});

const AddPart = Loadable({
  loader: () => import("../../components/parts/addpart.js"),
  loading: Loading
});

const PartView = Loadable({
  loader: () => import("../../components/parts/partview.js"),
  loading: Loading
});

const Notes = Loadable({
  loader: () => import("../../components/notes/notes.js"),
  loading: Loading
});

const NoteView = Loadable({
  loader: () => import("../../components/notes/noteview.js"),
  loading: Loading
});

const AddNote = Loadable({
  loader: () => import("../../components/notes/addnote.js"),
  loading: Loading
});

const Jobs = Loadable({
  loader: () => import("../../components/jobs/jobs.js"),
  loading: Loading
});

const JobView = Loadable({
  loader: () => import("../../components/jobs/jobview.js"),
  loading: Loading
});

const JobInvoice = Loadable({
  loader: () => import("../../components/jobs/jobinvoice.js"),
  loading: Loading
});

const EditJob = Loadable({
  loader: () => import("../../components/jobs/editjob.js"),
  loading: Loading
});

const Clients = Loadable({
  loader: () => import("../../components/clients/clients.js"),
  loading: Loading
});

const AddClient = Loadable({
  loader: () => import("../../components/clients/addclient.js"),
  loading: Loading
});

const ClientView = Loadable({
  loader: () => import("../../components/clients/clientview.js"),
  loading: Loading
});

const EditClient = Loadable({
  loader: () => import("../../components/clients/editclient.js"),
  loading: Loading
});

const EditPart = Loadable({
  loader: () => import("../../components/parts/editpart.js"),
  loading: Loading
});

const EditNote = Loadable({
  loader: () => import("../../components/notes/editnote.js"),
  loading: Loading
});

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
