import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import {
  Typography,
  Grid,
  Dialog,
  IconButton,
  Divider,
  withStyles,
  withMobileDialog,
  Paper
} from "@material-ui/core";
import { CardList } from "../../components";
import { DETAILED_CLIENT_BY_ID } from "../../queries";
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

const JobForm = Loadable({
  loader: () => import("../../components/jobs/jobform.js"),
  loading: Loading
});

const DeleteItem = Loadable({
  loader: () => import("../../components/reuseable/deleteitem.js"),
  loading: Loading
});

//  This component renders a s a child of home on the path
//  /clients/%clientid.  It presents the user with all information
//  about a given client, as well as paginated card for associated
//  notes and jobs.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r4C62

class ClientView extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false,
      add_job: false,
      add_note: false
    };
  }

  openModal = name => () => {
    this.setState({ [name]: true });
  };

  cancelModal = name => () => {
    this.setState({ [name]: false });
  };

  render() {
    const { classes, fullScreen } = this.props;

    return (
      <Query
        query={DETAILED_CLIENT_BY_ID}
        variables={{ id: this.props.match.params.id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let name;
          if (data.client.businessName) name = data.client.businessName;
          else name = `${data.client.firstName} ${data.client.lastName}`;

          let job_items = data.client.jobSet.edges;
          for (let i = 0; i < job_items.length; i++) {
            job_items[i].node.client = { businessName: name };
          }
          return (
            <div>
              <div>
                <Grid container>
                  <Grid item xs={1}>
                    <Link to={`/clients/${data.client.id}/edit`}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.typography} variant="title">
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={this.openModal("deleting")}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <Typography paragraph>{data.client.description}</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography align="left">
                    Business Name: {data.client.businessName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left">
                    Street Address: {data.client.streetAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left">{`Name: ${data.client.firstName} ${
                    data.client.lastName
                  }`}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">City: {data.client.city}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">
                    State: {data.client.state}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">
                    Zip: {data.client.zipcode}
                  </Typography>
                </Grid>
              </Grid>
              <Divider className={classes.margin} />
              <Typography
                className={classes.typography}
                align="center"
                variant="subheading"
                paragraph
              >{`Jobs for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="job"
                items={job_items}
                createMethod={this.openModal("add_job")}
                cancelCreateMethod={this.cancelModal("add_job")}
                after_path={this.props.location.pathname}
                refetch={refetch}
              />
              <Divider />
              <Typography
                className={classes.typography}
                paragraph
                align="center"
                variant="subheading"
              >{`Notes for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="note"
                items={data.client.noteSet.edges}
                createMethod={this.openModal("add_note")}
                cancelCreateMethod={this.cancelModal("add_note")}
                refetch={refetch}
              />
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelModal("deleting")}
                fullScreen={fullScreen}
              >
                <DeleteItem
                  cancelDelete={this.cancelModal("deleting")}
                  type="client"
                  item={data.client}
                  after_path="/clients"
                />
              </Dialog>
              <Dialog
                open={this.state.add_job}
                onClose={this.cancelModal("add_job")}
                fullScreen={fullScreen}
              >
                <Paper className={classes.paper}>
                  <JobForm
                    mode="create"
                    parent={{ type: "client", id: data.client.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_job")}
                    refetch={refetch}
                  />
                </Paper>
              </Dialog>
              <Dialog
                open={this.state.add_note}
                onClose={this.cancelModal("add_note")}
                fullScreen={fullScreen}
              >
                <Paper className={classes.paper}>
                  <NoteForm
                    mode="modal"
                    parent={{ type: "client", id: data.client.id }}
                    after_path={this.props.location.pathname}
                    cancelAdd={this.cancelModal("add_note")}
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

export default withRouter(withMobileDialog()(withStyles(styles)(ClientView)));
