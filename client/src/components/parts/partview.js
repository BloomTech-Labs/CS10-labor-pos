import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  IconButton,
  Dialog,
  withStyles,
  Card
} from "@material-ui/core";
import { DETAILED_PART_BY_ID } from "../../queries.js";
import { Query } from "react-apollo";
import { CardList, DeleteItem } from "../../components";
import { Delete, Create } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";

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
        query={DETAILED_PART_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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
                <Typography className={classes.typography} variant="title">
                  {data.part.name}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={this.handleDeleteButton}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph className={classes.typography}>
                  {data.part.description}
                </Typography>
              </Grid>
              <Grid item xs={2}>
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
                  after_path="/parts"
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
