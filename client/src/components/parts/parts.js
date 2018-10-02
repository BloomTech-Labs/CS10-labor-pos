import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography } from "@material-ui/core";
import { QUERY_ALL_PARTS } from "../../queries";

//  This component will render on the /parts route when the user is logged in
//  It is a child of the home component.
//  It will present the user with a paginated list of part cards.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rC0F6
class Parts extends Component {
  render() {
    return (
      <Query query={QUERY_ALL_PARTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <Typography variant="display3">Parts</Typography>
              <CardList
                items={data.allParts.edges}
                type="part"
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

export default withRouter(Parts);
