import React, { Component } from "react";
import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { Mutation, Query } from "react-apollo";
import { Formik, Field, Form } from "formik";
import { withRouter } from "react-router";
import { CREATE_JOB, UPDATE_JOB } from "../../mutations";
import { QUERY_ALL_CLIENTS } from "../../queries";
import { styles } from "../material-ui/styles.js";
import { TextField } from "../../components";
const Yup = require("yup");
//  This component will render the forms to create and edit jobs.
//
//  PROPS:
//    mode: Accepts "create" or "edit"; indicates what the component should be doing
//    job: In edit mode, a job will be passed down from the parent component.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rB029
const JobSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Name must be under 100 characters")
    .required("Name is required"),
  client: Yup.string().required("Client is required"),
  description: Yup.string().required("Description is required"),
  labor: Yup.number().nullable(),
  deadline: Yup.date().nullable(),
  complete: Yup.boolean().nullable()
});

class JobForm extends Component {
  render() {
    const { classes } = this.props;
    let chosen_mutation = CREATE_JOB;
    let title_text = "Add Job";
    let button_text = "Create";
    let edit_job = {
      name: "",
      client: "",
      description: "",
      labor: "",
      deadline: "",
      complete: ""
    };
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_JOB;
      title_text = `Update ${this.props.job.name}`;
      button_text = "Update";
      for (let key in this.props.job) {
        if (this.props.job[key] === null) edit_job[key] = "";
        else edit_job[key] = this.props.job[key];
      }
    }
    if (this.props.mode === "create") {
      edit_job.client = this.props.parent.id;
    }
    return (
      <Query query={QUERY_ALL_CLIENTS}>
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
          return (
            <Formik
              initialValues={{
                client: edit_job.client,
                name: edit_job.name,
                description: edit_job.description,
                labor: edit_job.labor,
                complete: edit_job.complete,
                deadline: edit_job.deadline
              }}
              validationSchema={JobSchema}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              {({ values, isValid }) => {
                return (
                  <Mutation
                    mutation={chosen_mutation}
                    onCompleted={() => this._confirm()}
                  >
                    {(mutateJob, { loading, error }) => (
                      <div>
                        <Form
                          onSubmit={event => {
                            event.preventDefault();
                            let job_variables = {
                              client: values.client,
                              name: values.name,
                              labor: values.labor,
                              description: values.description,
                              deadline: values.deadline,
                              complete: values.complete
                            };
                            for (let key in job_variables) {
                              if (job_variables[key] === "") {
                                delete job_variables[key];
                              }
                            }
                            if (this.props.mode === "edit")
                              job_variables.id = this.props.match.params.id;
                            mutateJob({
                              variables: job_variables
                            });
                          }}
                        >
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                variant="title"
                                className={classes.typography_title}
                              >
                                {title_text}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                id="field-client"
                                disabled={this.props.mode === "create"}
                                select="true"
                                label="Client"
                                name="client"
                                component="select"
                                placeholder="Client"
                                className={classNames(
                                  classes.margin,
                                  classes.textField,
                                  classes.state_field
                                )}
                                style={{
                                  width: "194px",
                                  height: "55px"
                                }}
                              >
                                {client_list.map(client => (
                                  <option
                                    key={client.value}
                                    value={client.value}
                                  >
                                    {client.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                component={TextField}
                                id="field-name"
                                label="Name"
                                name="name"
                                className={classes.textField}
                                value={values.name}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={10}>
                              <Field
                                component={TextField}
                                id="field-description"
                                label="Description"
                                multiline
                                fullWidth
                                rows="8"
                                rowsMax="8"
                                name="description"
                                className={classes.field}
                                value={values.description}
                                margin="normal"
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Field
                                component={TextField}
                                id="field-labor"
                                label="Labor"
                                name="labor"
                                className={classes.textField}
                                value={values.labor}
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Field
                                checked={values.complete}
                                name="complete"
                                type="checkbox"
                                value={values.complete}
                                label="Completed?"
                              />
                              <Typography>Completed?</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Field
                                component={TextField}
                                id="field-deadline"
                                label="Deadline"
                                name="deadline"
                                className={classes.textField}
                                value={values.deadline}
                                margin="normal"
                                type="date"
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
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
                        {loading && <p>Saving job information...</p>}
                        {error && <p>{error}</p>}
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
    window.location.reload();
    this.props.history.push(this.props.after_url);
  };
}

export default withRouter(withStyles(styles)(JobForm));
