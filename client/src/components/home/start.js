import React, { Component } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

class Start extends Component {
  render() {
    return (
      <div>
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
