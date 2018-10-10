import React, { Component } from "react";
import {
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  withStyles,
  Select
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { Formik, Form, Field } from "formik";
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
    .required(),
  client: Yup.string().required(),
  description: Yup.string().required(),
  labor: Yup.string(),
  deadline: Yup.date(),
})

class JobForm extends Component {
    render() {
    const { classes } = this.props;
    let chosen_mutation = CREATE_JOB;
    let title_text = "Add Job";
    let button_text = "Create";
    let edit_job = {
      title: "",
      client: "",
      description: "",
      labor: "",
      deadline: ""
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
    return(
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
                  title: edit_job.title,
                  description: edit_job.description,
                  labor: edit_job.labor,
                  deadline: edit_job.deadline
                  }}
                  validationSchema={JobSchema}
                  onSubmit={event => {
                  event.preventDefault();
                 }}
               >
       {({ errors, touched, values, isValid, handleChange, handleBlur }) => {
            return (
              <Mutation
                mutation={chosen_mutation}
                onCompleted={() => this._confirm()}
              >
                {(mutateJob, { loading, error, data }) => (
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
                        if (job_variables.deadline === "")
                          job_variables.deadline = null;
                        for (let key in job_variables) {
                          if (job_variables[key] === "") {
                            if (this.props.mode === "edit")
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
                          className={classes.typography}
                      >
                        {title_text}
                      </Typography>
                      </Grid>
                        <Grid item xs={12}>
                          <Field
                            id="field-name"
                            label="Name"
                            name="name"
                            className={"modal_field"}
                            value={values.name}
                            helperText="Job Name"
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                          <Field
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
                           <Grid item xs={6}>
                              <Select
                                id="field-client"
                                label="Client"
                                name="client"
                                className={"modal_field"}
                                value={values.client}
                                error={
                                  errors.client &&
                                  touched.client &&
                                  errors.client
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                {client_list.map(client => (
                                  <MenuItem
                                    key={client.value}
                                    value={client.value}
                                  >
                                    {client.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                          <Field
                            id="field-labor"
                            label="Labor"
                            name="labor"
                            className={"modal_field"}
                            value={values.labor}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.complete}
                                onChange={this.toggleComplete}
                                value={values.complete}
                              />
                            }
                            label="Job Complete"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="field-deadline"
                            label="Deadline"
                            name="deadline"
                            className={"modal_field"}
                            value={values.deadline}
                            onChange={e =>{
                              handleChange(e);
                            }}
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
};

  _confirm = () => {
    window.location.reload();
    this.props.history.push("/jobs");
  };
}

export default withRouter(withStyles(styles)(JobForm));
