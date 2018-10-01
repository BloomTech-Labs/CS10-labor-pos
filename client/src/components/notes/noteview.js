import React, { Component } from "react";
import { withRouter } from "react-router";
import { Query } from "react-apollo";
import { DETAILED_NOTE_BY_ID } from "../../queries";
import { Typography, Grid, IconButton, Dialog } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { CardList, DeleteItem } from "../../components";
import NoteForm from "./noteform";

//  This component will render as a child of home on the
//  /notes/%noteid route when the user is logged in.
//  It presents the user with the note title and content
//  as well as a paginated list of tags associated with it
//  and its created and modified dates.  It also provides
//  a form to edit the note.

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
    return (
      <Query
        query={DETAILED_NOTE_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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
                <Grid item xs={11}>
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
                  <Typography>
                    Created On:{" "}
                    {`${created.getMonth()}/${created.getDate()}/${created.getFullYear()}`}
                  </Typography>
                  <Typography>
                    Modified On:{" "}
                    {`${modified.getMonth()}/${modified.getDate()}/${modified.getFullYear()}`}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <CardList
                    rows={1}
                    columns={4}
                    type="tag"
                    items={data.note.tagSet.edges}
                  />
                </Grid>
              </Grid>
              <NoteForm mode="edit" note={data.note} />
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

export default withRouter(NoteView);
