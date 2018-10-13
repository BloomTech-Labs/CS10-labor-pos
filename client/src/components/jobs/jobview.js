import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import DoneOutline from "@material-ui/icons/DoneOutline.js";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt.js";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import {
  Typography,
  Grid,
  Dialog,
  IconButton,
  Button,
  withStyles,
  Card,
  Paper,
  withMobileDialog
} from "@material-ui/core";
import { ItemList } from "../../components";
import { DETAILED_JOB_BY_ID } from "../../queries";
import { styles } from "../material-ui/styles.js";
import Loadable from "react-loadable";

function Loading({ error }) {
  if (error) {
    return <p>{error}</p>;
  } else {
    return <h3>Loading...</h3>;
  }
}

const NoteForm = Loadable({
  loader: () => import("../../components/notes/noteform.js"),
  loading: Loading
});

const PartForm = Loadable({
  loader: () => import("../../components/parts/partform.js"),
  loading: Loading
});

const DeleteItem = Loadable({
  loader: () => import("../../components/reuseable/deleteitem.js"),
  loading: Loading
});

//  This component will render as a child of home on the path /jobs/%jobid
//  It will present the user with the job info from the database as well as
//  paginated lists of associated notes, parts, and an invoice
//  generation button.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9

class JobView extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false,
      add_note: false,
      add_part: false
    };
  }

  openModal = name => () => {
    this.setState({ [name]: true });
  };

  cancelModal = name => () => {
    this.setState({ [name]: false });
  };

  render() {
    const { classes, fullscreen } = this.props;
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let right_content = [];

          if (data.job.complete) {
            right_content.push(
              <Typography key={0}>
                <DoneOutline />
                Job Complete
              </Typography>
            );
          } else {
            right_content.push(
              <Typography key={0}>
                <ArrowRightAlt />
                Job In Progress
              </Typography>
            );
          }
          if (data.job.deadline) {
            right_content.push(
              <Typography key={1}>Deadline: {data.job.deadline}</Typography>
            );
          }
          const created = new Date(data.job.createdAt);
          const modified = new Date(data.job.modifiedAt);
          right_content.push(
            <Typography key={2}>
              Labor/hours worked: {data.job.labor}
            </Typography>
          );

          right_content.push(
            <Typography key={3}>
              Created On:{" "}
              {`${created.getMonth()}/${created.getDate()}/${created.getFullYear()}`}
            </Typography>
          );
          right_content.push(
            <Typography key={4}>
              Modified On:{" "}
              {`${modified.getMonth()}/${modified.getDate()}/${modified.getFullYear()}`}
            </Typography>
          );

          return (
            <div>
              <div className="job-view-top">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={24}
                >
                  <Grid item xs={1}>
                    <Link to={`/jobs/${data.job.id}/edit`}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="title">{data.job.name}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={this.openModal("deleting")}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <Typography paragraph>{data.job.description}</Typography>
              <div className="job-view-lists">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={24}
                >
                  <Grid item xs={1} />
                  <Grid item xs={7}>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="flex-start"
                      spacing={24}
                    >
                      <Grid item xs={4}>
                        {/*TODO: make these links pass the associated job to the create component*/}

                        <Button
                          onClick={this.openModal("add_note")}
                          className="job-list-button"
                        >
                          Add a new note
                        </Button>

                        <ItemList
                          type="note"
                          items={data.job.noteSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          className="job-list-button"
                          onClick={this.openModal("add_part")}
                        >
                          Add a new part
                        </Button>

                        <ItemList
                          type="part"
                          items={data.job.partSet.edges}
                          per_page={7}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Card className={classes.card}>{right_content}</Card>
                    <Link to={`/jobs/${data.job.id}/invoice`}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.padded_button}
                      >
                        Invoice
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </div>
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelModal("deleting")}
                className="delete-modal"
                fullScreen={fullscreen}
              >
                <DeleteItem
                  cancelDelete={this.cancelModal("deleting")}
                  type="job"
                  item={data.job}
                  after_path="/jobs"
                />
              </Dialog>
              <Dialog
                open={this.state.add_note}
                onClose={this.cancelModal("add_note")}
                fullScreen={fullscreen}
              >
                <Paper className={classes.paper}>
                  <NoteForm
                    mode="modal"
                    parent={{ type: "job", id: data.job.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_note")}
                  />
                </Paper>
              </Dialog>
              <Dialog
                open={this.state.add_part}
                onClose={this.cancelModal("add_part")}
                fullScreen={fullscreen}
              >
                <Paper className={classes.paper}>
                  <PartForm
                    mode="modal"
                    parent={{ type: "job", id: data.job.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_part")}
                  />
                </Paper>
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withMobileDialog()(withStyles(styles)(JobView)));
