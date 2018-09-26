import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

// Query to return all notes for a user and their associated tags
const NOTES_AND_ASSOCIATED_TAGS = gql`
  {
    allNotes {
      edges {
        node {
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
    }
  }
`;

//This component will render as a child of home on the
// /notes route when the user is logged in.
//It presents the user with a paginated list of cards
//for all notes.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r46CE
class Notes extends Component {
  render() {
    return (
      <div>
        <p>NOTE PLACEHOLDER</p>
        <Query query={NOTES_AND_ASSOCIATED_TAGS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;
            return <div>What</div>;
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(Notes);
