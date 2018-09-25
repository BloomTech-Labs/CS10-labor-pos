import React, { Component } from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Create, Delete, DoneOutline, ArrowRightAlt } from "@material-ui/icons";
import { Typography, Grid, Paper, Button } from "@material-ui/core";
import "./jobview.css";

//This component will render as a child of home on the path /jobs/%jobid
//It will present the user with the job info from the database as well as
//paginated lists of associated notes, parts, and tags, and an invoice
//generation button.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9

const DETAILED_JOB_BY_ID = gql`
  query job($id: ID!) {
    job(id: $id) {
      client {
        firstName
        lastName
      }
      name
      complete
      labor
      description
      createdAt
      modifiedAt
      deadline
      tagSet {
        edges {
          node {
            name
          }
        }
      }
      noteSet {
        edges {
          node {
            title
          }
        }
      }
      partSet {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

class JobView extends Component {
  render() {
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.log(data);
          let right_content = [];
          if (data.job) {
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
          }
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
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
                    <Create />
                  </Grid>
                  <Grid item xs={10}>
                    <h3>{data.job.name}</h3>
                  </Grid>
                  <Grid item xs={1}>
                    <Delete />
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
                  <Grid item xs={9}>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                      spacing={24}
                    >
                      <Grid item xs={4}>
                        <Button className="job-list-button">
                          Add a new note
                        </Button>
                        <Paper>note placeholder</Paper>
                      </Grid>
                      <Grid item xs={4}>
                        <Button className="job-list-button">
                          Add a new part
                        </Button>
                        <Paper>part placeholder</Paper>
                      </Grid>
                      <Grid item xs={4}>
                        <Button className="job-list-button">
                          Add a new tag
                        </Button>
                        <Paper>tag placeholder</Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    {right_content}
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(JobView);
