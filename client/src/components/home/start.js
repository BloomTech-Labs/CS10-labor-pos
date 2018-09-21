import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Grid, Card } from "@material-ui/core";

//The start component renders at the root route when the user is logged in
//It is intended to offer a selection of the most likely tasks the user
//may be logging in for.
//We may reconfigure this to be an info thing instead of a card collection.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r2278
class Start extends Component {
  render() {
    return (
      <div>
        {/*This is using a material ui grid; it works the same as bootstrap columns with the numbers out of 12*/}
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Card>
              <Button href="/clients">Click to view clients</Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button href="/jobs">Click to view jobs</Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button href="/notes">Click to view notes</Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button href="/tags">click to view tags</Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button href="/parts">click to view parts</Button>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Button href="/invoices">click to view invoices</Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Start);
