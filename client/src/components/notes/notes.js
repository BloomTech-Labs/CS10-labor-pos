import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { CardList } from "../../components";
import { Typography, withStyles } from "@material-ui/core";
import { QUERY_ALL_NOTES } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  This component will render as a child of home on the
//  /notes route when the user is logged in.
//  It presents the user with a paginated list of cards
//  for all notes.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r46CE
class Notes extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={QUERY_ALL_NOTES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className={classes.pad_me}>
              <Typography className={classes.typography} variant="title">
                Notes
              </Typography>
              <CardList
                items={data.allNotes.edges}
                type="note"
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

export default withRouter(withStyles(styles)(Notes));
