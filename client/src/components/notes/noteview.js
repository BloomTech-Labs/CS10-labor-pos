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
  Card
} from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";
import { DeleteItem } from "../../components";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";

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
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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
                <Grid item xs={1}>
                  <Link to={`/notes/${data.note.id}/edit`}>
                    <IconButton>
                      <Create />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="title">{data.note.title}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={this.handleDeleteButton}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography paragraph>{data.note.content}</Typography>
              <Grid container>
                <Grid item xs={2}>
                  <Card className={classes.card}>
                    <Typography>
                      Created On:{" "}
                      {`${created.getMonth()}/${created.getDate()}/${created.getFullYear()}`}
                    </Typography>
                    <Typography>
                      Modified On:{" "}
                      {`${modified.getMonth()}/${modified.getDate()}/${modified.getFullYear()}`}
                    </Typography>
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
