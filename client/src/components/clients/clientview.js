import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Create, Delete } from "@material-ui/icons";
import {
  Typography,
  Grid,
  Dialog,
  IconButton,
  Divider,
  withStyles,
  withMobileDialog
} from "@material-ui/core";
import { CardList, DeleteItem, JobForm } from "../../components";
import { DETAILED_CLIENT_BY_ID } from "../../queries";
import { styles } from "../material-ui/styles.js";

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
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let name;
          if (data.client.businessName) name = data.client.businessName;
          else name = `${data.client.firstName} ${data.client.lastName}`;
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
              <Divider />
              <Typography
                className={classes.typography}
                align="left"
                variant="subheading"
              >{`Jobs for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="job"
                items={data.client.jobSet.edges}
                createMethod={this.openModal("add_job")}
                cancelCreateMethod={this.cancelModal("add_job")}
              />
              <Divider />
              <Typography
                className={classes.typography}
                align="left"
                variant="subheading"
              >{`Notes for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="note"
                items={data.client.noteSet.edges}
                createMethod={this.openModal("add_note")}
                cancelCreateMethod={this.cancelModal("add_note")}
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
                <JobForm
                  mode="create"
                  parent={{ type: "client", id: data.client.id }}
                  after_url={this.props.location.pathname}
                  cancelAdd={this.cancelModal("add_job")}
                />
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withMobileDialog()(withStyles(styles)(ClientView)));
