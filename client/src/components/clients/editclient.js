import React, { Component } from "react";
import { withRouter } from "react-router";
import ClientForm from "./clientform.js";
import { DETAILED_CLIENT_BY_ID } from "../../queries";
import { Query } from "react-apollo";

//  The edit client component renders as a child of home on the path
//  /client/:id/edit.  It presents the user with a prepopulated form to submit
//  a mutation for an updated client.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rE2B1
class EditClient extends Component {
  // pulls in client details via query, switches form to edit mode so user can make changes
  render() {
    return (
      <Query
        query={DETAILED_CLIENT_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <ClientForm mode="edit" client={data.client} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EditClient);
