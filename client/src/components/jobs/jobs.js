import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography, withStyles } from "@material-ui/core";
import { QUERY_ALL_JOBS } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  This component will render as a child of home on the path /jobs
//  It will present the user with a paginated list of job cards.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class Jobs extends Component {
  render() {
    const { classes } = this.props;
    return (
      // retrieves data for all jobs to display
      <Query query={QUERY_ALL_JOBS}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <div className={classes.margin}>
              <Typography className={classes.typography} variant="title">
                Jobs
              </Typography>
              <br />
              <br />
              <CardList
                items={data.allJobs.edges}
                type="job"
                rows={2}
                columns={3}
                refetch={refetch}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(Jobs));
