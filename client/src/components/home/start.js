import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Card,
  withStyles,
  Typography,
  Tooltip
} from "@material-ui/core";
import { styles } from "../material-ui/styles.js";
import Help from "@material-ui/icons/Help.js";

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
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
          <Grid item xs={12}>
            <Typography className={classes.typography_title} variant="title">
              Home
            </Typography>
            <br />
          </Grid>
          <Link to="/clients">
            <Grid container>
              <Button>
                <Card className={classes.start_card}>
                  <Grid item xs={9} />
                  <Grid item xs={3}>
                    <Tooltip
                      title={`Clients are your customers.\n\nThrough the client page, you can add jobs for the client and notes about the client.`}
                    >
                      <Help />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.typography} variant="title">
                      View <br /> Clients
                    </Typography>
                  </Grid>
                  <Grid item xs={12} />
                </Card>
              </Button>
            </Grid>
          </Link>
          <Link to="/jobs">
            <Grid container>
              <Button>
                <Card className={classes.start_card}>
                  <Grid item xs={9} />
                  <Grid item xs={3}>
                    <Tooltip
                      title={`Jobs are specific jobs being done for a customer and are created through the client.\n\nThrough a job, you can add parts (which would be line items in your invoice) and notes about the job.`}
                    >
                      <Help />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.typography} variant="title">
                      View <br /> Jobs
                    </Typography>
                  </Grid>
                  <Grid item xs={12} />
                </Card>
              </Button>
            </Grid>
          </Link>
          <Link to="/notes">
            <Grid container>
              <Button>
                <Card className={classes.start_card}>
                  <Grid item xs={9} />
                  <Grid item xs={3}>
                    <Tooltip title="Notes can be made attached to a client, a job, or be unattached to anything, giving you the flexibility to keep track of all of your projects.">
                      <Help />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.typography} variant="title">
                      View <br /> Notes
                    </Typography>
                  </Grid>
                  <Grid item xs={12} />
                </Card>
              </Button>
            </Grid>
          </Link>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Start));
