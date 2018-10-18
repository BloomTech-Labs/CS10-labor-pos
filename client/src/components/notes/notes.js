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
  handleCreate = () => {
    this.props.history.push("/createnote");
  };

  render() {
    const { classes } = this.props;
    return (
      <Query query={QUERY_ALL_NOTES}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <div className={classes.margin}>
              <Typography className={classes.typography_title} variant="title">
                Notes
              </Typography>
              <br />
              <br />
              <CardList
                items={data.allNotes.edges}
                type="note"
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

export default withRouter(withStyles(styles)(Notes));
