import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Typography,
  Grid,
  Button,
  withStyles,
  Hidden
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { CREATE_NOTE, UPDATE_NOTE } from "../../mutations.js";
import { ALL_CLIENTS_AND_JOBS } from "../../queries.js";
import { styles } from "../material-ui/styles.js";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";
import classNames from "classnames";
const Yup = require("yup");

//Schema for validation
const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .max(150, "Title must be under 150 characters")
    .required(),
  content: Yup.string().required(),
  client: Yup.string(),
  job: Yup.string()
});

//  This component can dynamically update or create
//  a note depeinding on the props it's given.
//  https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class NoteForm extends Component {
  render() {
    //  Get MaterialUI classes
    const { classes } = this.props;
    //  Here, we default some variables to their values that will be used in create mode
    let chosen_mutation = CREATE_NOTE;
    let title_text = "Add Note";
    let button_text = "Create";
    let edit_note = {
      title: "",
      content: "",
      client: "",
      job: ""
    };
    //  If the component is in edit mode, we change those values to reflect the fact.
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_NOTE;
      title_text = `Update ${this.props.note.title}`;
      button_text = "Update";
      //  load in the current values of the item we are editing.
      for (let key in this.props.note) {
        if (this.props.note[key] === null) edit_note[key] = "";
        else edit_note[key] = this.props.note[key];
      }

      //  Load in either the appropriate ids or empty strings for clients and jobs
      if (this.props.note.job) edit_note.job = this.props.note.job.id;
      else edit_note.client = { id: "" };
      if (this.props.note.client) edit_note.client = this.props.note.client.id;
      else edit_note.job = { id: "" };
    } else if (this.props.mode === "modal") {
      if (this.props.parent.type === "client")
        edit_note.client = this.props.parent.id;
      else if (this.props.parent.type === "job")
        edit_note.job = this.props.parent.id;
    }

    return (
      //  This query gets the names and ids of all clients and jobs to populate the pulldown menus
      <Query query={ALL_CLIENTS_AND_JOBS}>
        {({ loading, error, data }) => {
          //  Show loading and error messages...
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
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
          client_list.push({ value: "", label: "None" });
          //  Build the array for the job pulldown.  It's simpler than the client one.
          let job_list = [];
          let job_array = data.allJobs.edges;
          for (let i = 0; i < job_array.length; i++) {
            job_list.push({
              value: job_array[i].node.id,
              label: job_array[i].node.name
            });
          }
          job_list.push({ value: "", label: "None" });
          return (
            //  Give initial values to Formik from the edit_note object
            <Formik
              initialValues={{
                client: edit_note.client,
                job: edit_note.job,
                title: edit_note.title,
                content: edit_note.content
              }}
              validationSchema={NoteSchema}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              {({ values, isValid }) => {
                return (
                  //  This mutation will submit either a create user or update user mutation
                  //  using the values from our form fields depending on the component mode.
                  <Mutation
                    mutation={chosen_mutation}
                    onCompleted={() => this._confirm()}
                  >
                    {mutateJob => (
                      <div className={classes.modal}>
                        {/*This formik form replaced a base html form.
                        note_variables is the variables object given to the mutation
                        it is comprised of information from Formik's values object*/}
                        <Form
                          onSubmit={event => {
                            event.preventDefault();
                            let note_variables = {
                              title: values.title,
                              content: values.content,
                              job: values.job,
                              client: values.client
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
                          }}
                        >
                          {/*Now for the actual form.  Uses grids for positioning.*/}
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                variant="title"
                                className={classes.typography_title}
                                align="center"
                              >
                                {title_text}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container justify="center">
                                <Field
                                  component={TextField}
                                  id="field-title"
                                  label="Title"
                                  name="title"
                                  className={classes.margin}
                                  value={values.title}
                                  margin="normal"
                                />
                              </Grid>
                            </Grid>
                            <Grid item xs={1} />
                            {/*This field uses the field class from our styles to
                      get a distinctive background color.*/}
                            <Grid item xs={10}>
                              <Field
                                component={TextField}
                                id="field-content"
                                label="Content"
                                multiline
                                rows="8"
                                rowsMax="8"
                                name="content"
                                className={classes.field}
                                value={values.content}
                                margin="normal"
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={1} />
                            {/*The pulldown form items using the arrays we built above*/}
                            <Grid item xs={12} md={6}>
                              <Field
                                id="field-client"
                                label="Client"
                                name="client"
                                disabled={
                                  this.props.mode === "modal" &&
                                  this.props.parent.type === "client"
                                }
                                component="select"
                                className={classNames(
                                  classes.margin,
                                  classes.textField,
                                  classes.state_field
                                )}
                                value={values.client}
                              >
                                {client_list.map(client => (
                                  <option
                                    key={client.value}
                                    value={client.value}
                                    className={classes.menuitems}
                                  >
                                    {client.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Field
                                id="field-job"
                                label="Job"
                                name="job"
                                disabled={
                                  this.props.mode === "modal" &&
                                  this.props.parent.type === "job"
                                }
                                className={classNames(
                                  classes.margin,
                                  classes.textField,
                                  classes.state_field
                                )}
                                value={values.job}
                                component="select"
                              >
                                {job_list.map(job => (
                                  <option
                                    key={job.value}
                                    value={job.value}
                                    className={classes.menuitems}
                                  >
                                    {job.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                          <Grid container justify="space-around">
                            <Hidden xsUp={this.props.mode !== "modal"}>
                              <Button
                                variant="contained"
                                color="secondary"
                                className={classes.padded_button}
                                onClick={this.props.cancelAdd}
                              >
                                Cancel
                              </Button>
                            </Hidden>
                            <Button
                              disabled={!isValid}
                              variant="contained"
                              color="primary"
                              className={classes.padded_button}
                              type="submit"
                            >
                              {button_text}
                            </Button>
                          </Grid>
                        </Form>
                      </div>
                    )}
                  </Mutation>
                );
              }}
            </Formik>
          );
        }}
      </Query>
    );
  }
  _confirm = () => {
    //  After submission, reload the window to get updated information and go to the notes route.
    if (this.props.mode === "modal") {
      this.props.refetch();
      this.props.cancelAdd();
    } else if (this.props.mode === "edit") this.props.history.goBack();
    else this.props.history.push("/notes");
  };
}

export default withRouter(withStyles(styles)(NoteForm));
