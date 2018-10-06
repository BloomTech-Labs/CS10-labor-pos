import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { DETAILED_TAG_BY_ID } from "../../queries";
import {
  Typography,
  Grid,
  IconButton,
  Card,
  Dialog,
  withStyles
} from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";
import { ItemCard, DeleteItem } from "../../components";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";

//  This component will render on the /tags/%tagid route when the user is logged in
//  It is a child of the home component.
//  It presents the user with the name and description of the tag, as well as
//  paginated lists of the parts notes and jobs tagged with the current tag
//  and a form with which the tag can be edited.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/rA413

class TagView extends Component {
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
        query={DETAILED_TAG_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // const created = new Date(data.tag.createdAt);
          // const modified = new Date(data.tag.modifiedAt);
          return (
            <React.Fragment>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={24}
              >
                <Grid item xs={1}>
                  <Link to={`/tags/${data.tag.id}/edit`}>
                    <IconButton>
                      <Create />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="title">{data.tag.name}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={this.handleDeleteButton}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography paragraph>{data.tag.description}</Typography>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={24}
              >
                <Grid item xs={3}>
                  <Card className={classes.item_card}>
                    <ItemCard type="job" item={data.tag.job} />
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.item_card}>
                    <ItemCard type="note" item={data.tag.note} />
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.item_card}>
                    <ItemCard type="part" item={data.tag.part} />
                  </Card>
                </Grid>
              </Grid>
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelDelete}
                className="delete-modal"
              >
                <DeleteItem
                  cancelDelete={this.cancelDelete}
                  type="tag"
                  item={data.tag}
                  after_path="/tags"
                />
              </Dialog>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(TagView));
