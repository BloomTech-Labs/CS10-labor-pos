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
  Divider
} from "@material-ui/core";
import { CardList, DeleteItem } from "../../components";
import { DETAILED_CLIENT_BY_ID } from "../../queries";
import "./clientview.css";

//  This component renders a s a child of home on the path
//  /clients/%clientid.  It presents the user with all information
//  about a given client, as well as paginated card for associated
//  notes and jobs.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r4C62

class ClientView extends Component {
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
              <div className="client-view-top">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={24}
                >
                  <Grid item xs={1}>
                    <Link to={`/clients/${data.client.id}/edit`}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="title">{name}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={this.handleDeleteButton}>
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
                <Grid item xs={2}>
                  <Typography align="left">
                    Street Number: {data.client.streetNumber}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">
                    Unit Number: {data.client.unitNumber}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="left">
                    Street Name: {data.client.streetName}
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
                <Grid item xs={6}>
                  {data.client.deadline}
                </Grid>
              </Grid>
              <Divider />
              <Typography
                align="left"
                variant="subheading"
              >{`Jobs for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="job"
                items={data.client.jobSet.edges}
              />
              <Divider />
              <Typography
                align="left"
                variant="subheading"
              >{`Notes for ${name}:`}</Typography>
              <CardList
                rows={1}
                columns={4}
                type="note"
                items={data.client.noteSet.edges}
              />
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelDelete}
                className="delete-modal"
              >
                <DeleteItem
                  cancelDelete={this.cancelDelete}
                  type="client"
                  item={data.client}
                  after_path="/clients"
                />
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ClientView);
