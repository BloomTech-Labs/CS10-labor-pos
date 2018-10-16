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
        <br />
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
              <br />
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Link to="/clients">
                  <Button>
                    <Card className={classes.start_card}>
                      <Typography className={classes.typography}>
                        Click to view clients
                      </Typography>
                    </Card>
                  </Button>
                </Link>
                <br />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Link to="/jobs">
                  <Button>
                    <Card className={classes.start_card}>
                      <Typography className={classes.typography}>
                        Click to view jobs
                      </Typography>
                    </Card>
                  </Button>
                </Link>
                <br />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Link to="/notes">
                  {" "}
                  <Button>
                    <Card className={classes.start_card}>
                      <Typography className={classes.typography}>
                        Click to view notes
                      </Typography>
                    </Card>
                  </Button>
                </Link>
                <br />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <br />
        <br />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Start));
