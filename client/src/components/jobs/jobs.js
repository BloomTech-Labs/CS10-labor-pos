import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Grid, Card } from "@material-ui/core";
import JobCard from "./jobcard";
import gql from "graphql-tag";
import { Query } from "react-apollo";

//A dummy job for testing before I have queries working.

const dummyjob = {
  name: "Fake Job For Testing!",
  id: 42
};

const QUERY_ALL_JOBS = gql`
  query {
    allJobs {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;

//This component will render as a child of home on the path /jobs
//It will present the user with a paginated list of job cards.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class Jobs extends Component {
  render() {
    return (
      <Query query={QUERY_ALL_JOBS}>
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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
        }}
      </Query>
    );
  }
}

export default withRouter(Jobs);
