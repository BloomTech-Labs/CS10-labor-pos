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
            <Typography
              className={classes.typography_title_checkout}
              variant="title"
            >
              Hover over a box to learn more
            </Typography>
            <br />
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
                <Tooltip
                  title={`Clients are your customers.\n\nThrough the client page, you can add jobs for the client and notes about the client.`}
                  disableHoverListener={true}
                >
                  <Link to="/clients">
                    <Button>
                      <Card className={classes.start_card}>
                        <Typography className={classes.typography}>
                          View clients
                        </Typography>
                      </Card>
                    </Button>
                  </Link>
                </Tooltip>
                <br />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Tooltip
                  disableHoverListener={true}
                  title={`Jobs are specific jobs being done for a customer and are created through the client.\n\nThrough a job, you can add parts (which would be line items in your invoice) and notes about the job.`}
                >
                  <Link to="/jobs">
                    <Button>
                      <Card className={classes.start_card}>
                        <Typography className={classes.typography}>
                          View jobs
                        </Typography>
                      </Card>
                    </Button>
                  </Link>
                </Tooltip>
                <br />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Tooltip
                  disableHoverListener={true}
                  title="Notes can be made attached to a client, a job, or be unattached to anything, giving you the flexibility to keep track of all of your projects."
                >
                  <Link to="/notes">
                    {" "}
                    <Button>
                      <Card className={classes.start_card}>
                        <Typography className={classes.typography}>
                          View notes
                        </Typography>
                      </Card>
                    </Button>
                  </Link>
                </Tooltip>
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
