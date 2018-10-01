import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography } from "@material-ui/core";
import { QUERY_ALL_TAGS } from "../../queries";

//  This component will render on the /tags route when the user is logged in
//  It is a child of the home component.
//  It presents the user with a paginated view of tag cards.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r8418
class Tags extends Component {
  render() {
    return (
      <Query query={QUERY_ALL_TAGS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <Typography variant="display3">Tags</Typography>
              <CardList
                items={data.allTags.edges}
                type="tag"
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

export default withRouter(Tags);
