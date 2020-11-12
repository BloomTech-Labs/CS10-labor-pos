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
import AddCircle from "@material-ui/icons/AddCircle.js";

function Loading({ error }) {
  if (error) {
    return <Typography>{error}</Typography>;
  } else {
    return <Typography>Loading...</Typography>;
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
  loader: () => import("../../components/reusable/deleteitem.js"),
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
    // displays job details individually on cards
    const { classes, fullScreen } = this.props;
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          refetch();
          let right_content = [];
          if (data.job.complete) {
            right_content.push(
              <Typography key={0}>
                <DoneOutline />
                <b>Job Complete</b>
              </Typography>
            );
          } else {
            right_content.push(
              <React.Fragment key={0}>
                <Typography>
                  <ArrowRightAlt /> &nbsp; &nbsp; <b>Job In Progress</b>
                </Typography>
                <br />
              </React.Fragment>
            );
          }
          if (data.job.deadline) {
            right_content.push(
              <React.Fragment key={1}>
                <Typography>
                  Deadline: &nbsp; &nbsp;
                  {data.job.deadline}
                </Typography>
                <br />
              </React.Fragment>
            );
          }
          const created = new Date(data.job.createdAt);
          const modified = new Date(data.job.modifiedAt);
          right_content.push(
            <React.Fragment key={2}>
              <Typography>
                Labor/hours worked: &nbsp; &nbsp;
                {data.job.labor}
              </Typography>
              <br />
            </React.Fragment>
          );

          right_content.push(
            <React.Fragment key={3}>
              <Typography>
                Created On:&nbsp; &nbsp;
                {`${created.getMonth() +
                  1}/${created.getDate()}/${created.getFullYear()}`}
              </Typography>
              <br />
            </React.Fragment>
          );
          right_content.push(
            <Typography key={4}>
              Modified On:&nbsp; &nbsp;
              {`${modified.getMonth() +
                1}/${modified.getDate()}/${modified.getFullYear()}`}
            </Typography>
          );

          return (
            <div>
              <br />
              <div className="job-view-top">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  spacing={24}
                >
                  <Grid item xs={2}>
                    <Link to={`/jobs/${data.job.id}/edit`}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="title"
                      className={classes.typography_title}
                    >
                      {data.job.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={this.openModal("deleting")}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <br />
              <Card style={{ width: "90%", height: "40vh", margin: "auto" }}>
                <Typography paragraph className={classes.note}>
                  {data.job.description}
                </Typography>
              </Card>
              <br />
              <br />
              <div className="job-view-lists">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  spacing={24}
                >
                  <Grid item xs={12} md={4}>
                    {!user_premium &&
                      data.job.noteSet.edges.length < 6 && (
                        <Button
                          onClick={this.openModal("add_note")}
                          className={classes.add_button}
                        >
                          <AddCircle /> &nbsp;&nbsp;
                          <Typography className={classes.add_text}>
                            New note
                          </Typography>
                        </Button>
                      )}
                    {user_premium && (
                      <Button
                        onClick={this.openModal("add_note")}
                        className={classes.add_button}
                      >
                        <AddCircle /> &nbsp;&nbsp;
                        <Typography className={classes.add_text}>
                          New note
                        </Typography>
                      </Button>
                    )}
                    <ItemList
                      type="note"
                      items={data.job.noteSet.edges}
                      refetch={refetch}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {!user_premium &&
                      data.job.partSet.edges.length < 6 && (
                        <Button
                          className={classes.add_button}
                          onClick={this.openModal("add_part")}
                        >
                          <AddCircle /> &nbsp;&nbsp;
                          <Typography className={classes.add_text}>
                            New part
                          </Typography>
                        </Button>
                      )}
                    {user_premium && (
                      <Button
                        className={classes.add_button}
                        onClick={this.openModal("add_part")}
                      >
                        <AddCircle /> &nbsp;&nbsp;
                        <Typography className={classes.add_text}>
                          New part
                        </Typography>
                      </Button>
                    )}

                    <ItemList
                      type="part"
                      items={data.job.partSet.edges}
                      referTo={data.job.id}
                      refetch={refetch}
                      after_path={this.props.location.pathname}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
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
                </Grid>
              </div>
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelModal("deleting")}
                className="delete-modal"
                fullScreen={fullScreen}
              >
                <DeleteItem
                  cancelDelete={this.cancelModal("deleting")}
                  type="job"
                  item={data.job}
                  after_path={"/jobs"}
                />
              </Dialog>
              <Dialog
                open={this.state.add_note}
                onClose={this.cancelModal("add_note")}
                fullScreen={fullScreen}
              >
                <Paper className={classes.paper}>
                  <NoteForm
                    mode="modal"
                    parent={{ type: "job", id: data.job.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_note")}
                    refetch={refetch}
                  />
                </Paper>
              </Dialog>
              <Dialog
                open={this.state.add_part}
                onClose={this.cancelModal("add_part")}
                fullScreen={fullScreen}
              >
                <Paper className={classes.paper}>
                  <PartForm
                    mode="modal"
                    parent={{ type: "job", id: data.job.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_part")}
                    refetch={refetch}
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
