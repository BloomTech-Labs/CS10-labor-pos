import React, { Component } from "react";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  Create,
  Delete,
  DoneOutline,
  ArrowRightAlt,
  NavigateNext,
  NavigateBefore
} from "@material-ui/icons";
import {
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { ItemList } from "../../components";
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
  constructor() {
    super();
    this.state = {
      note_page: 0,
      part_page: 0,
      tag_page: 0
    };
  }

  handlePageForward = name => event => {
    event.preventDefault();
    this.setState({
      [name]: this.state[name] + 1
    });
  };

  handlePageBack = name => event => {
    event.preventDefault();
    if (this.state[name] > 0) {
      this.setState({
        [name]: this.state[name] - 1
      });
    }
  };

  render() {
    return (
      <Query
        query={DETAILED_JOB_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          let right_content = [];
          let note_list = [];
          let part_list = [];
          let tag_list = [];

          if (data.job) {
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
                    <IconButton>
                      <Create />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <h3>{data.job.name}</h3>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton>
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
                          thing_listed="note"
                          name_field="title"
                          items={data.job.noteSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <ItemList
                          thing_listed="part"
                          name_field="name"
                          items={data.job.partSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <ItemList
                          thing_listed="tag"
                          name_field="name"
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
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(JobView);
