import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography, withStyles } from "@material-ui/core";
import { QUERY_ALL_TAGS } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  This component will render on the /tags route when the user is logged in
//  It is a child of the home component.
//  It presents the user with a paginated view of tag cards.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r8418
class Tags extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={QUERY_ALL_TAGS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className={classes.pad_me}>
              <Typography variant="title" className={classes.typography}>
                Tags
              </Typography>
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

export default withRouter(withStyles(styles)(Tags));
