import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Typography,
  TextField,
  Grid,
  MenuItem,
  Button,
  withStyles
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { CREATE_NOTE, UPDATE_NOTE } from "../../mutations.js";
import { ALL_CLIENTS_AND_JOBS } from "../../queries.js";
import { styles } from "../material-ui/styles.js";

//  This component can dynamically update or create
//  a note depeinding on the props it's given.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class NoteForm extends Component {
  // The state of this component is used to hold the form values
  state = {
    title: "",
    content: "",
    client: "",
    job: ""
  };

  //  In componentDidMount, we check to see if the component is in edit mode, and if it is we
  //  load in the current values of the item we are editing.
  componentDidMount = () => {
    //  Build an edit_note object from the note passed down as a prop.
    if (this.props.mode === "edit") {
      let edit_note = {};
      for (let key in this.props.note) {
        if (this.props.note[key] === null) edit_note[key] = "";
        else edit_note[key] = this.props.note[key];
      }
      //  If we don't have a client or a job on the item, use the empty string for the value.
      if (!edit_note.client) edit_note.client = { id: "" };
      if (!edit_note.job) edit_note.job = { id: "" };
      //  Load the edit note into the state.
      this.setState({
        client: edit_note.client.id,
        job: edit_note.job.id,
        title: edit_note.title,
        content: edit_note.content
      });
    }
  };

  //  Updates the state with form values
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    //  Get MaterialUI classes
    const { classes } = this.props;
    //  Destructure some things from the state
    const { title, content, client, job } = this.state;
    //  Here, we default some variables to their values that will be used in create mode
    let chosen_mutation = CREATE_NOTE;
    let title_text = "Add Note";
    let button_text = "Create";
    //  If the component is in edit mode, we change those values to reflect the fact.
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_NOTE;
      title_text = `Update ${this.props.note.title}`;
      button_text = "Update";
    }
    return (
      //  This query gets the names and ids of all clients and jobs to populate the pulldown menus
      <Query query={ALL_CLIENTS_AND_JOBS}>
        {({ loading, error, data }) => {
          //  Show loading and error messages...
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          //  Here, we build the array that will be used for the client pulldown.
          let client_list = [];
          let client_array = data.allClients.edges;
          for (let i = 0; i < client_array.length; i++) {
            //  This if/else allows us to dynamically show either the businessname or firstname
            //  / lastname of the client.
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
          //  Build the array for the job pulldown.  It's simpler than the client one.
          let job_list = [];
          let job_array = data.allJobs.edges;
          for (let i = 0; i < job_array.length; i++) {
            job_list.push({
              value: job_array[i].node.id,
              label: job_array[i].node.name
            });
          }
          return (
            //  This mutation will submit either a create user or update user mutation
            //  using the values from our form fields depending on the component mode.
            <Mutation
              mutation={chosen_mutation}
              onCompleted={() => this._confirm()}
            >
              {(mutateJob, { loading, error, data }) => (
                <div>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      let note_variables = {
                        title: title,
                        content: content,
                        job: job,
                        client: client
                      };
                      //  Here, we strip off any empty strings from the variables
                      for (let key in note_variables) {
                        if (note_variables[key] === "") {
                          if (this.props.mode === "edit")
                            delete note_variables[key];
                        }
                      }
                      //  If we are in edit mode, we need to send up the note id.
                      if (this.props.mode === "edit")
                        note_variables.id = this.props.match.params.id;
                      //  Send the mutation ...
                      mutateJob({
                        variables: note_variables
                      });
                      //  And clear local state!
                      this.setState({
                        title: "",
                        content: "",
                        job: "",
                        client: ""
                      });
                    }}
                  >
                    {/*Now for the actual form.  Uses grids for positioning.*/}
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="title"
                          className={classes.typography}
                        >
                          {title_text}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={1} />
                      {/*This field uses the field class from our styles to
                      get a distinctive background color.*/}
                      <Grid item xs={10}>
                        <TextField
                          id="field-content"
                          label="Content"
                          multiline
                          fullWidth
                          rows="8"
                          rowsMax="8"
                          name="content"
                          className={classes.field}
                          value={content}
                          onChange={this.handleChange("content")}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={1} />
                      {/*The pulldown form items using the arrays we built above*/}
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
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.padded_button}
                      type="submit"
                    >
                      {button_text}
                    </Button>
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
    //  After submission, reload the window to get updated information and go to the notes route.
    window.location.reload();
    this.props.history.push("/notes");
  };
}

export default withRouter(withStyles(styles)(NoteForm));
