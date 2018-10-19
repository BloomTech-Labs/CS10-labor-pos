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
  Paper,
  Button,
  Hidden,
  Tabs,
  Tab
} from "@material-ui/core";
import { CardList } from "../../components";
import { DETAILED_CLIENT_BY_ID } from "../../queries";
import { styles } from "../material-ui/styles.js";
import Loadable from "react-loadable";
import AddCircle from "@material-ui/icons/AddCircle.js";
import Work from "@material-ui/icons/Work.js";
import NoteAdd from "@material-ui/icons/NoteAdd.js";

function Loading({ error }) {
  if (error) {
    return <Typography>{error}</Typography>;
  } else {
    return <Typography>Loading...</Typography>;
  }
}
// brings in ability to create notes and jobs from within the client
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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
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
      add_note: false,
      job: true,
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  openModal = name => () => {
    this.setState({ [name]: true });
  };

  cancelModal = name => () => {
    this.setState({ [name]: false });
  };

  render() {
    const { classes, fullScreen } = this.props;
    const { value } = this.state;
    // runs query to retrieve client details and displays individually on cards
    return (
      <Query
        query={DETAILED_CLIENT_BY_ID}
        variables={{ id: this.props.match.params.id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
          let name;
          if (data.client.businessName) name = data.client.businessName;
          else name = `${data.client.firstName} ${data.client.lastName}`;
          let job_items = data.client.jobSet.edges;
          for (let i = 0; i < job_items.length; i++) {
            job_items[i].node.client = { businessName: name };
          }
          let user_premium = localStorage.getItem("USER_PREMIUM");
          if (user_premium === "true") user_premium = true;
          else user_premium = false;
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
                      <span className={classes.highlight}>{name}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={this.openModal("deleting")}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <br />
              <br />
              <Typography paragraph>{data.client.description}</Typography>
              <Paper className={classes.card}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>Business Name:</b> &nbsp; &nbsp;{" "}
                      {data.client.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>Street Address:</b> &nbsp; &nbsp;
                      {data.client.streetAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>Name:</b> &nbsp; &nbsp;{" "}
                      {`${data.client.firstName} ${data.client.lastName}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>City:</b> &nbsp; &nbsp;
                      {data.client.city}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>State:</b> &nbsp; &nbsp; {data.client.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      align="left"
                      variant="subheading"
                      className={classes.space_above}
                    >
                      <b>Zip:</b> &nbsp; &nbsp; {data.client.zipcode}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Divider className={classes.margin} />
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<Work />} value={0} label={`Jobs for ${name}`} />
                <Tab icon={<NoteAdd />} value={1} label={`Notes for ${name}`} />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Typography
                    className={classes.typography}
                    align="left"
                    variant="subheading"
                    paragraph
                  >
                    {user_premium && (
                      <Button
                        onClick={this.openModal("add_job")}
                        className={classes.add_button}
                        variant="contained"
                      >
                        <AddCircle /> &nbsp;&nbsp;
                        <Typography className={classes.add_text}>
                          New Job
                        </Typography>
                      </Button>
                    )}
                    {!user_premium &&
                      job_items.length < 6 && (
                        <Button
                          onClick={this.openModal("add_job")}
                          className={classes.add_button}
                          variant="contained"
                        >
                          <AddCircle />
                          &nbsp;&nbsp;
                          <Typography>New Job</Typography>
                        </Button>
                      )}
                    Jobs for <span className={classes.highlight}>{name}</span>
                  </Typography>
                  <CardList
                    columns={3}
                    type="job"
                    items={job_items}
                    createMethod={this.openModal("add_job")}
                    cancelCreateMethod={this.cancelModal("add_job")}
                    after_path={this.props.location.pathname}
                    refetch={refetch}
                  />{" "}
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Typography
                    className={classes.typography}
                    paragraph
                    align="left"
                    variant="subheading"
                  >
                    {user_premium && (
                      <Button
                        onClick={this.openModal("add_note")}
                        className={classes.add_button}
                        variant="contained"
                      >
                        <AddCircle /> &nbsp;&nbsp;
                        <Typography className={classes.add_text}>
                          New Note
                        </Typography>
                      </Button>
                    )}
                    {!user_premium &&
                      data.client.noteSet.edges.length < 6 && (
                        <Button
                          onClick={this.openModal("add_note")}
                          className={classes.add_button}
                          variant="contained"
                        >
                          <AddCircle />
                          <Typography>New Note</Typography>
                        </Button>
                      )}
                    Notes for <span className={classes.highlight}>{name}</span>
                  </Typography>
                  <CardList
                    rows={1}
                    columns={3}
                    type="note"
                    items={data.client.noteSet.edges}
                    createMethod={this.openModal("add_note")}
                    cancelCreateMethod={this.cancelModal("add_note")}
                    refetch={refetch}
                  />
                </TabContainer>
              )}
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
