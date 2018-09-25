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
          console.log(data);

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

            //Build a list of notes to display in the notes area
            console.log(data.job.noteSet.edges.length);
            for (let i = 0; i < data.job.noteSet.edges.length; i++) {
              let current_note = data.job.noteSet.edges[i].node;
              note_list.push(
                <ListItem key={i} dense button role={undefined}>
                  <ListItemText>{current_note.title}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }

            //Build a list of parts to display in the parts area
            console.log(data.job.partSet.edges.length);
            for (
              let i = 7 * this.state.part_page;
              i < 7 * (this.state.part_page + 1) &&
              i < data.job.partSet.edges.length;
              i++
            ) {
              console.log("what?!");
              let current_part = data.job.partSet.edges[i].node;
              part_list.push(
                <ListItem key={i} dense button role={undefined}>
                  <ListItemText>{current_part.name}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }

            //Build a list of tags to display in the tags area
            console.log(data.job.tagSet.edges.length);
            for (let i = 0; i < data.job.tagSet.edges.length; i++) {
              let current_tag = data.job.tagSet.edges[i].node;
              tag_list.push(
                <ListItem key={i} dense button role={undefined}>
                  <ListItemText>{current_tag.name}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }
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
                        <Button className="job-list-button">
                          Add a new note
                        </Button>
                        <Paper>
                          <List>{note_list}</List>
                        </Paper>
                        <IconButton>
                          <NavigateBefore />
                        </IconButton>
                        <IconButton>
                          <NavigateNext />
                        </IconButton>
                      </Grid>
                      <Grid item xs={4}>
                        <Button className="job-list-button">
                          Add a new part
                        </Button>
                        <Paper>
                          <List>{part_list}</List>
                        </Paper>
                        <IconButton onClick={this.handlePageBack("part_page")}>
                          <NavigateBefore />
                        </IconButton>
                        <IconButton
                          onClick={this.handlePageForward("part_page")}
                        >
                          <NavigateNext />
                        </IconButton>
                      </Grid>
                      <Grid item xs={4}>
                        <Button className="job-list-button">
                          Add a new tag
                        </Button>
                        <Paper>
                          <List>{tag_list}</List>
                        </Paper>
                        <IconButton>
                          <NavigateBefore />
                        </IconButton>
                        <IconButton>
                          <NavigateNext />
                        </IconButton>
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
