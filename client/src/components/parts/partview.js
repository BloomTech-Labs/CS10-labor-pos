import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import { DETAILED_PART_BY_ID } from "../../queries.js";
import { Query } from "react-apollo";

//This component will render on the /parts/%partid route when the user is logged in
//It is a child of the home component.
//It will present the user with details about the individual part, as well as
//a form to edit it and a paginated list of tags applied to it.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r773D
class PartView extends Component {
  render() {
    return (
      <Query
        query={DETAILED_PART_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          console.log(data);
          return (
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="title">{data.part.name}</Typography>
              </Grid>
              <Grid item xs={1}>
                PLACEHOLDER DELETE BUTTON
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>PART DESCRIPTION PLACEHOLDER</Typography>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(PartView);
