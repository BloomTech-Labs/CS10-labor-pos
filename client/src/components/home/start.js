import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
          <Grid item xs={4}>
            <Card>
              <Link to="/clients">
                <Button>Click to view clients</Button>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Link to="/jobs">
                <Button>Click to view jobs</Button>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Link to="/notes">
                <Button>Click to view notes</Button>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Link to="/tags">
                <Button>Click to view tags</Button>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Link to="/parts">
                <Button>Click to view parts</Button>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <Link to="/invoices">
                <Button>Click to view invoices</Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Start);
