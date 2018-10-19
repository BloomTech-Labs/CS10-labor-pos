import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography, withStyles } from "@material-ui/core";
import { QUERY_ALL_CLIENTS } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  The clients component renders as a child of the home component and displays a paginated list of client cards
//  on path /clients

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r6059
class Clients extends Component {
  handleCreate = () => {
    this.props.history.push("/createclient");
  };
  // this component runs the QUERY_ALL_CLIENTS query to retrieve client data for display
  render() {
    const { classes } = this.props;
    return (
      <Query query={QUERY_ALL_CLIENTS}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <div className={classes.margin}>
              <Typography variant="title" className={classes.typography_title}>
                Clients
              </Typography>
              <br />
              <br />
              <CardList
                items={data.allClients.edges}
                type="client"
                rows={2}
                columns={3}
                createMethod={this.handleCreate}
                refetch={refetch}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(Clients));
