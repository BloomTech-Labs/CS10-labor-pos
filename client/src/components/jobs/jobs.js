import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Grid, Card } from "@material-ui/core";
import JobCard from "./jobcard";

//A dummy job for testing before I have queries working.

const dummyjob = {
  name: "Fake Job For Testing!",
  id: 42
};

//This component will render as a child of home on the path /jobs
//It will present the user with a paginated list of job cards.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class Jobs extends Component {
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
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <JobCard job={dummyjob} />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Jobs);
