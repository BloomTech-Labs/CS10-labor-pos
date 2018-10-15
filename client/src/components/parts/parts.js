import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography, withStyles } from "@material-ui/core";
import { QUERY_ALL_PARTS } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  This component will render on the /parts route when the user is logged in
//  It is a child of the home component.
//  It will present the user with a paginated list of part cards.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rC0F6
class Parts extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={QUERY_ALL_PARTS}>
      // retrieve parts data for display
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className={classes.margin}>
              <Typography className={classes.typography} variant="title">
                Parts
              </Typography>
              <CardList
                items={data.allParts.edges}
                type="part"
                rows={2}
                columns={4}
                refetch={refetch}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(Parts));
