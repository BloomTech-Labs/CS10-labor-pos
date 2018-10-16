import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  IconButton,
  Dialog,
  withStyles,
  Card,
  Paper
} from "@material-ui/core";
import { DETAILED_PART_BY_ID } from "../../queries.js";
import { Query } from "react-apollo";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
import Loadable from "react-loadable";

function Loading({ error }) {
  if (error) {
    return <Typography>{error}</Typography>;
  } else {
    return <Typography>Loading ... </Typography>;
  }
}

const DeleteItem = Loadable({
  loader: () => import("../../components/reuseable/deleteitem.js"),
  loading: Loading
});

//This component will render on the /parts/%partid route when the user is logged in
//It is a child of the home component.
//It will present the user with details about the individual part, as well as
//a form to edit it

//https://balsamiq.cloud/sc1hpyg/po5pcja/r773D
class PartView extends Component {
  state = {
    deleting: false
  };

  handleDeleteButton = () => {
    this.setState({ deleting: true });
  };

  cancelDelete = () => {
    this.setState({ deleting: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Query
        // retrieves parts data to display individually on cards
        query={DETAILED_PART_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          return (
            <Grid container>
              <Grid item xs={1}>
                <Link to={`/parts/${data.part.id}/edit`}>
                  <IconButton>
                    <Create />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  className={classes.typography_title}
                  variant="title"
                >
                  {data.part.name}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={this.handleDeleteButton}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography paragraph className={classes.typography}>
                    {data.part.description}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <Typography className={classes.typography}>{`Cost: $${
                    data.part.cost
                  }`}</Typography>
                </Card>
              </Grid>
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelDelete}
                className="delete-modal"
              >
                <DeleteItem
                  cancelDelete={this.cancelDelete}
                  type="part"
                  item={data.part}
                  refetch={refetch}
                />
              </Dialog>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(PartView));
