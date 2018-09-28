import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Create, Delete, DoneOutline, ArrowRightAlt } from "@material-ui/icons";
import {
  Typography,
  Grid,
  Dialog,
  IconButton,
  Button
} from "@material-ui/core";
import { ItemList, DeleteItem } from "../../components";
import { DETAILED_JOB_BY_ID } from "../../queries";
import "./jobview.css";

//  This component will render as a child of home on the path /jobs/%jobid
//  It will present the user with the job info from the database as well as
//  paginated lists of associated notes, parts, and tags, and an invoice
//  generation button.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r52D9

class JobView extends Component {
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
                        {/*TODO: make these links pass the associated job to the create component*/}
                        <Link to="/createnote">
                          <Button className="job-list-button">
                            Add a new note
                          </Button>
                        </Link>
                        <ItemList
                          type="note"
                          items={data.job.noteSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Link to="/createpart">
                          <Button className="job-list-button">
                            Add a new part
                          </Button>
                        </Link>
                        <ItemList
                          type="part"
                          items={data.job.partSet.edges}
                          per_page={7}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Link to="/createtag">
                          <Button className="job-list-button">
                            Add a new tag
                          </Button>
                        </Link>
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
                    <Link to={`/jobs/${data.job.id}/invoice`}>
                      <Button>Invoice</Button>
                    </Link>
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
                  after_path="/jobs"
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
