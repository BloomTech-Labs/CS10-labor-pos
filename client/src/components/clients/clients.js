import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography } from "@material-ui/core";
import { QUERY_ALL_CLIENTS } from "../../queries";

//  The clients component renders as a child of the home component and displays a paginated list of client cards
//  on path /clients

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r6059
class Clients extends Component {
  render() {
    return (
      <Query query={QUERY_ALL_CLIENTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <Typography variant="display3">Clients</Typography>
              <CardList
                items={data.allClients.edges}
                type="client"
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

export default withRouter(Clients);
