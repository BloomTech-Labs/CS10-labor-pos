import React, { Component } from "react";
import { withRouter } from "react-router";
import JobForm from "./jobform.js";
import { DETAILED_JOB_BY_ID } from "../../queries";
import { Query } from "react-apollo";
import { Typography } from "@material-ui/core";

//  This component will render as a child of home on the path /jobs/%jobid/edit
//  It will present the user with a prepopulated form and allow them to edit and
//  submit the job information.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r20F6
// retrieves detailed job data via query, switches form to edit mode so that user can make changes
class EditJob extends Component {
  render() {
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <div>
              <JobForm mode="edit" job={data.job} after_path="/jobs" />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EditJob);
