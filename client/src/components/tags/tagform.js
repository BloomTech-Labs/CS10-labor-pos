import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Typography,
  TextField,
  Grid,
  MenuItem,
  Button
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { CREATE_TAG, UPDATE_TAG } from "../../mutations.js";
import { ALL_NOTES_PARTS_JOBS } from "../../queries.js";

//  This renders as a child component of addtag and edittag
//  It presents the user with a potentially prepopulated
//  form for adding or updating a tag.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r1473
class TagForm extends Component {
  state = {
    name: "",
    description: "",
    job: "",
    note: "",
    part: ""
  };

  componentDidMount = () => {
    if (this.props.mode === "edit") {
      let edit_tag = {};
      for (let key in this.props.tag) {
        if (this.props.tag[key] === null) edit_tag[key] = "";
        else edit_tag[key] = this.props.tag[key];
      }

      this.setState({
        name: edit_tag.name,
        description: edit_tag.description
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { name, description, job, note, part } = this.state;
    let chosen_mutation = CREATE_TAG;
    let title_text = "Add Tag";
    let button_text = "Create";
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_TAG;
      title_text = `Update ${this.props.tag.name}`;
      button_text = "Update";
    }
    return (
      <Query query={ALL_NOTES_PARTS_JOBS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          let job_list = [];
          let job_array = data.allJobs.edges;
          for (let i = 0; i < job_array.length; i++) {
            job_list.push({
              value: job_array[i].node.id,
              label: job_array[i].node.name
            });
          }

          let note_list = [];
          let note_array = data.allNotes.edges;
          for (let i = 0; i < note_array.length; i++) {
            note_list.push({
              value: note_array[i].node.id,
              label: note_array[i].node.title
            });
          }

          let part_list = [];
          let part_array = data.allParts.edges;
          for (let i = 0; i < part_array.length; i++) {
            part_list.push({
              value: part_array[i].node.id,
              label: part_array[i].node.name
            });
          }

          return (
            <Mutation
              mutation={chosen_mutation}
              onCompleted={() => this._confirm()}
            >
              {(mutateJob, { loading, error, data }) => (
                <div>
                  <Typography variant="title">{title_text}</Typography>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      let tag_variables = {
                        name: name,
                        description: description,
                        job: job,
                        part: part,
                        note: note
                      };

                      for (let key in tag_variables) {
                        if (tag_variables[key] === "") {
                          if (this.props.mode === "edit")
                            delete tag_variables[key];
                          else throw `${key} is a required field!`;
                        }
                      }
                      if (this.props.mode === "edit")
                        tag_variables.id = this.props.match.params.id;
                      mutateJob({
                        variables: tag_variables
                      });
                      this.setState({
                        name: "",
                        description: "",
                        job: job,
                        part: part,
                        note: note
                      });
                    }}
                  >
                    <TextField
                      id="field-name"
                      label="Name"
                      name="name"
                      className={"modal_field"}
                      value={name}
                      onChange={this.handleChange("name")}
                      helperText="Tag Name"
                      margin="normal"
                    />
                    <TextField
                      id="field-description"
                      label="Description"
                      multiline
                      fullWidth
                      rows="8"
                      rowsMax="8"
                      name="description"
                      className={"modal_field"}
                      value={description}
                      onChange={this.handleChange("description")}
                      margin="normal"
                      variant="outlined"
                    />
                    <Grid container>
                      <Grid item xs={4}>
                        <TextField
                          id="field-job"
                          select
                          label="Job"
                          name="job"
                          className={"modal_field"}
                          value={job}
                          onChange={this.handleChange("job")}
                          SelectProps={{
                            MenuProps: {
                              className: "Mister Menu"
                            }
                          }}
                          helperText="Select Job"
                          margin="normal"
                        >
                          {job_list.map(job => (
                            <MenuItem key={job.value} value={job.value}>
                              {job.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="field-note"
                          select
                          label="Note"
                          name="note"
                          className={"modal_field"}
                          value={note}
                          onChange={this.handleChange("note")}
                          SelectProps={{
                            MenuProps: {
                              className: "Mister Menu"
                            }
                          }}
                          helperText="Select Note"
                          margin="normal"
                        >
                          {note_list.map(note => (
                            <MenuItem key={note.value} value={note.value}>
                              {note.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="field-part"
                          select
                          label="Part"
                          name="part"
                          className={"modal_field"}
                          value={part}
                          onChange={this.handleChange("part")}
                          SelectProps={{
                            MenuProps: {
                              className: "Mister Menu"
                            }
                          }}
                          helperText="Select Part"
                          margin="normal"
                        >
                          {part_list.map(part => (
                            <MenuItem key={part.value} value={part.value}>
                              {part.label}
                            </MenuItem>
                          ))}
                          )}
                        </TextField>
                      </Grid>
                    </Grid>
                    <div className="form-bottom-button">
                      <Button type="submit">{button_text}</Button>
                    </div>
                  </form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
  _confirm = () => {
    window.location.reload();
    this.props.history.push("/tags");
  };
}

export default withRouter(TagForm);
