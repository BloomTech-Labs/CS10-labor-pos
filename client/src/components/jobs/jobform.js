import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  withStyles,
  Hidden
} from "@material-ui/core";
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
// schema definition for formik
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
    let chosen_mutation = CREATE_JOB; // form can be in create or edit mode
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
      if (this.props.job.client) edit_job.client = this.props.job.client.id;
    }
    if (this.props.mode === "create") {
      edit_job.client = this.props.parent.id;
    }
    return (
      // jobs must be created from within a client account so that job is connected to client
      // this retrieves client data so that job can be attached to specified client
      <Query query={QUERY_ALL_CLIENTS}>
        {({ loading, error, data }) => {
          if (loading) return <Typography>Loading...</Typography>;
          if (error) return <Typography>Error! {error.message}</Typography>;
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
              // tells formik to validate against our pre-defined Job Schema
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
                      <div className={classes.modal}>
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
                          <Grid container justify="center">
                            <Grid container justify="center">
                              <Typography
                                variant="title"
                                className={classes.typography_title}
                              >
                                {title_text}
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={1} />
                            <Grid item xs={6} md={4}>
                              <Field
                                id="field-client"
                                disabled={this.props.mode === "create"}
                                label="Client"
                                name="client"
                                component="select"
                                value={values.client}
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
                                    className={classes.menu_items}
                                  >
                                    {client.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
                            <Grid item xs={3} md={2} />
                            <Grid item xs={11} md={4}>
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
                            <Grid item xs={12}>
                              <Field
                                component={TextField}
                                id="field-description"
                                label="Description"
                                multiline
                                rows="8"
                                rowsMax="8"
                                name="description"
                                className={classes.field}
                                value={values.description}
                                margin="normal"
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
                              <Grid
                                container
                                justify="center"
                                alignItems="center"
                                direction="column"
                              >
                                <Field
                                  checked={values.complete}
                                  name="complete"
                                  type="checkbox"
                                  value={values.complete}
                                  label="Completed"
                                  className={classes.checkbox}
                                />
                                <Typography>Completed</Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                component={TextField}
                                id="field-deadline"
                                label="Deadline"
                                InputLabelProps={{
                                  shrink: true
                                }}
                                name="deadline"
                                className={classes.textField}
                                value={values.deadline}
                                margin="normal"
                                type="date"
                              />
                            </Grid>
                            <Grid container justify="space-around">
                              <Hidden xsUp={this.props.mode === "edit"}>
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
                          </Grid>
                        </Form>
                        {loading && (
                          <Typography>Saving job information...</Typography>
                        )}
                        {error && <Typography>{error}</Typography>}
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
  // if job is not created returns to form
  _confirm = () => {
    if (this.props.mode === "create") {
      this.props.refetch();
      this.props.cancelAdd();
    } else this.props.history.goBack();
  };
}

export default withRouter(withStyles(styles)(JobForm));
