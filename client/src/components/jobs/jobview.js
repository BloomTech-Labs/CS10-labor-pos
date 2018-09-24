import React, { Component } from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { Query } from "react-apollo";

//This component will render as a child of home on the path /jobs/%jobid
//It will present the user with the job info from the database as well as
//paginated lists of associated notes, parts, and tags, and an invoice
//generation button.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9

const DETAILED_JOB_BY_ID = gql`
  query note($id: ID!) {
    note(id: $id) {
      title
      content
      tagSet {
        edges {
          node {
            name
            description
          }
        }
      }
    }
  }
`;

class JobView extends Component {
  render() {
    return (
      <Query query={DETAILED_JOB_BY_ID} variables={id}>
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <p>bllargh!</p>;
        }}
      </Query>
    );
  }
}

export default withRouter(JobView);
