import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grid, Card } from "@material-ui/core";
import JobCard from "./jobcard";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { CardList } from "../../components";

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
          data.allJobs && console.log(data.allJobs.edges[0].node);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <CardList
                items={data.allJobs.edges}
                CardComponent={JobCard}
                rows={2}
                columns={4}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Jobs);
