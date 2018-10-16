import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { DETAILED_NOTE_BY_ID } from "../../queries";
import {
  Typography,
  Grid,
  IconButton,
  Dialog,
  withStyles,
  Card,
  Hidden
} from "@material-ui/core";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
import Loadable from "react-loadable";
import { ItemCard } from "../../components";

function Loading({ error }) {
  if (error) {
    return <Typography>{error}</Typography>;
  } else {
    return <Typography>Loading...</Typography>;
  }
}

const DeleteItem = Loadable({
  loader: () => import("../../components/reuseable/deleteitem.js"),
  loading: Loading
});

//  This component will render as a child of home on the
//  /notes/%noteid route when the user is logged in.
//  It presents the user with the note title and content

class NoteView extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false
    };
  }

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
        query={DETAILED_NOTE_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          refetch();
          const created = new Date(data.note.createdAt);
          const modified = new Date(data.note.modifiedAt);
          return (
            <React.Fragment>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={24}
              >
                <Grid item xs={2}>
                  <Link to={`/notes/${data.note.id}/edit`}>
                    <IconButton>
                      <Create />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="title">{data.note.title}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={this.handleDeleteButton}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography paragraph>{data.note.content}</Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} md={4}>
                  <Card className={classes.card}>
                    <Typography>
                      Created On:{" "}
                      {`${created.getMonth() +
                        1}/${created.getDate()}/${created.getFullYear()}`}
                    </Typography>
                    <Typography>
                      Modified On:{" "}
                      {`${modified.getMonth() +
                        1}/${modified.getDate()}/${modified.getFullYear()}`}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Hidden xsUp={!data.note.job}>
                    <Card raised className={classes.item_card}>
                      <ItemCard
                        after_path={this.props.location.pathname}
                        type="job"
                        item={data.note.job}
                        refetch={refetch}
                      />
                    </Card>
                  </Hidden>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Hidden xsUp={!data.note.client}>
                    <Card raised className={classes.item_card}>
                      <ItemCard
                        after_path={this.props.location.pathname}
                        type="client"
                        item={data.note.client}
                        refetch={refetch}
                      />
                    </Card>
                  </Hidden>
                </Grid>
              </Grid>
              <Dialog open={this.state.deleting} onClose={this.cancelDelete}>
                <DeleteItem
                  cancelDelete={this.cancelDelete}
                  type="note"
                  item={data.note}
                  after_path="/notes"
                />
              </Dialog>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(NoteView));
