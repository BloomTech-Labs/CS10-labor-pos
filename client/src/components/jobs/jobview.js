import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Create, Delete, DoneOutline, ArrowRightAlt } from "@material-ui/icons";
import { Typography, Grid, Dialog, IconButton } from "@material-ui/core";
import { ItemList, DeleteItem } from "../../components";
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
      id
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
            id
          }
        }
      }
      noteSet {
        edges {
          node {
            title
            id
          }
        }
      }
      partSet {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

class JobView extends Component {
  constructor() {
    super();
    this.state = {
      note_page: 0,
      part_page: 0,
      tag_page: 0,
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
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          let right_content = [];

          if (data && data.job) {
            //Build an array of react objects to use as the right-side information display.
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
                    <Link to={`/jobs/${data.job.id}/edit`}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={10}>
                    <h3>{data.job.name}</h3>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={this.handleDeleteButton}>
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
                  <Grid item xs={9}>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="flex-start"
                      spacing={24}
                    >
                      <Grid item xs={4}>
                        <ItemList
                          type="note"
                          items={data.job.noteSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <ItemList
                          type="part"
                          items={data.job.partSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <ItemList
                          type="tag"
                          items={data.job.tagSet.edges}
                          per_page={7}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    {right_content}
                  </Grid>
                </Grid>
              </div>
              <Dialog
                open={this.state.deleting}
                onClose={this.cancelDelete}
                className="delete-modal"
              >
                <DeleteItem
                  cancelDelete={this.cancelDelete}
                  type="job"
                  item={data.job}
                />
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(JobView);
