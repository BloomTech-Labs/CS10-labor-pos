import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button, Grid, Card, withStyles, Typography } from "@material-ui/core";
import { styles } from "../material-ui/styles.js";

//The start component renders at the root route when the user is logged in
//It is intended to offer a selection of the most likely tasks the user
//may be logging in for.
//We may reconfigure this to be an info thing instead of a card collection.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r2278
class Start extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.typography} variant="title" />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={10}>
            {/*This is using a material ui grid; it works the same as bootstrap columns with the numbers out of 12*/}
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <Link to="/clients">
                    <Button>Click to view clients</Button>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <Link to="/jobs">
                    <Button>Click to view jobs</Button>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <Link to="/notes">
                    <Button>Click to view notes</Button>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <Link to="/parts">
                    <Button>Click to view parts</Button>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <Link to="/invoices">
                    <Button>Click to view invoices</Button>
                  </Link>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Start));
