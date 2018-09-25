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
  query job($id: ID!) {
    job(id: $id) {
      client {
        firstName
        lastName
      }
      name
      complete
      labor
      description
      createdAt
      modifiedAt
      deadline
      tagSet {
        edges {
          node {
            name
          }
        }
      }
      noteSet {
        edges {
          node {
            title
          }
        }
      }
      partSet {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

class JobView extends Component {
  render() {
    console.log(`Hey friend, ${this.props.match.params.id}`);
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.log(data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <p>{data.job.name}</p>;
        }}
      </Query>
    );
  }
}

export default withRouter(JobView);
