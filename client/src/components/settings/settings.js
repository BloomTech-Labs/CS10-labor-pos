import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grade } from "@material-ui/icons";
import { Grid, Typography, IconButton } from "@material-ui/core";

//  This component will render on the /settings route when the user is logged in
//  It is a child of the home component.
//  It presents the user with forms that allow them to view and edit their user
//  information and settings.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rFA17
class Settings extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography variant="display3">Settings</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <Grade />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Grid container />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Settings);
