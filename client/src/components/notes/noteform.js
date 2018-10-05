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
import { CREATE_NOTE, UPDATE_NOTE } from "../../mutations.js";
import { ALL_CLIENTS_AND_JOBS } from "../../queries.js";

//  This component can dynamically update or create
//  a note depeinding on the props it's given.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class NoteForm extends Component {
  state = {
    title: "",
    content: "",
    client: "",
    job: ""
  };

  componentDidMount = () => {
    if (this.props.mode === "edit") {
      let edit_note = {};
      for (let key in this.props.note) {
        if (this.props.note[key] === null) edit_note[key] = "";
        else edit_note[key] = this.props.note[key];
      }
      if (!edit_note.client) edit_note.client = { id: "" };
      if (!edit_note.job) edit_note.job = { id: "" };
      this.setState({
        client: edit_note.client.id,
        job: edit_note.job.id,
        title: edit_note.title,
        content: edit_note.content
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { title, content, client, job } = this.state;
    let chosen_mutation = CREATE_NOTE;
    let title_text = "Add Note";
    let button_text = "Create";
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_NOTE;
      title_text = `Update ${this.props.note.title}`;
      button_text = "Update";
    }
    return (
      <Query query={ALL_CLIENTS_AND_JOBS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let client_list = [];
          let client_array = data.allClients.edges;
          for (let i = 0; i < client_array.length; i++) {
            if (client_array[i].node.businessName)
              client_list.push({
                value: client_array[i].node.id,
                label: client_array[i].node.businessName
              });
            else
              client_list.push({
                value: client_array[i].node.id,
                label: `${client_array[i].node.firstName} ${
                  client_array[i].node.lastName
                }`
              });
          }
          let job_list = [];
          let job_array = data.allJobs.edges;
          for (let i = 0; i < job_array.length; i++) {
            job_list.push({
              value: job_array[i].node.id,
              label: job_array[i].node.name
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
                      let note_variables = {
                        title: title,
                        content: content,
                        job: job,
                        client: client
                      };

                      for (let key in note_variables) {
                        if (note_variables[key] === "") {
                          if (this.props.mode === "edit")
                            delete note_variables[key];
                        }
                      }
                      if (this.props.mode === "edit")
                        note_variables.id = this.props.match.params.id;
                      mutateJob({
                        variables: note_variables
                      });
                      this.setState({
                        title: "",
                        content: "",
                        job: "",
                        client: ""
                      });
                    }}
                  >
                    <TextField
                      id="field-title"
                      label="Title"
                      name="title"
                      className={"modal_field"}
                      value={title}
                      onChange={this.handleChange("title")}
                      helperText="Note Title"
                      margin="normal"
                    />
                    <TextField
                      id="field-content"
                      label="Content"
                      multiline
                      fullWidth
                      rows="8"
                      rowsMax="8"
                      name="content"
                      className={"modal_field"}
                      value={content}
                      onChange={this.handleChange("content")}
                      margin="normal"
                      variant="outlined"
                    />
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField
                          id="field-client"
                          select
                          label="Client"
                          name="client"
                          className={"modal_field"}
                          value={client}
                          onChange={this.handleChange("client")}
                          SelectProps={{
                            MenuProps: {
                              className: "Mister Menu"
                            }
                          }}
                          helperText="Select Client"
                          margin="normal"
                        >
                          {client_list.map(client => (
                            <MenuItem key={client.value} value={client.value}>
                              {client.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
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
    this.props.history.push("/notes");
  };
}

export default withRouter(NoteForm);
