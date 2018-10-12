/*import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Typography,
  Grid,
  Button,
  withStyles,
} from "@material-ui/core";
import classNames from "classnames";
import { Mutation, Query } from "react-apollo";
import { CREATE_PART, UPDATE_PART } from "../../mutations.js";
import { QUERY_ALL_JOBS } from "../../queries.js";
import { styles } from "../material-ui/styles.js";
import { Formik, Form, Field } from "formik";
import { TextField } from "..";
const Yup = require("yup");

//Schema for validation
const PartSchema = Yup.object().shape({
  name: Yup.string()
    .max(150, "Name must be under 100 characters")
    .required(),
  description: Yup.string().required(),
  cost: Yup.string(),
  job: Yup.string()
});

//  This component can dynamically update or create
//  a part depeinding on the props it's given.
//  https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class PartForm extends Component {
  render() {
    //  Get MaterialUI classes
    const { classes } = this.props;
    //  Here, we default some variables to their values that will be used in create mode
    let chosen_mutation = CREATE_PART;
    let title_text = "Add Part";
    let button_text = "Create";
    let edit_part = {
      name: "",
      description: "",
      cost: "",
      job: ""
    };
    //  If the component is in edit mode, we change those values to reflect the fact.
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_PART;
      title_text = `Update ${this.props.part.title}`;
      button_text = "Update";
      //  load in the current values of the item we are editing.
      for (let key in this.props.part) {
        if (this.props.part[key] === null) edit_part[key] = "";
        else edit_part[key] = this.props.part[key];
      }
      //  Load in either the appropriate ids or empty strings for jobs
      if (edit_part.job) edit_part.job = edit_part.job.id;
    }
    return (
      //  This query gets the names and ids of all clients and jobs to populate the pulldown menus
      <Query query={QUERY_ALL_JOBS}>
        {({ loading, error, data }) => {
          //  Show loading and error messages...
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          //  Build the array for the job pulldown.
          let job_list = [];
          let job_array = data.allJobs.edges;
          for (let i = 0; i < job_array.length; i++) {
            job_list.push({
              value: job_array[i].node.id,
              label: job_array[i].node.name
            });
          }
          return (
            //  Give initial values to Formik from the edit_part object
            <Formik
              initialValues={{
                job: edit_part.job,
                name: edit_part.title,
                cost: edit_part.cost,
                description: edit_part.description,
              }}
              validationSchema={PartSchema}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              {({
                errors,
                touched,
                values,
                isValid,
                handleChange,
                handleBlur
              }) => {
                return (
                  //  This mutation will submit either a create user or update user mutation
                  //  using the values from our form fields depending on the component mode.
                  <Mutation
                    mutation={chosen_mutation}
                    onCompleted={() => this._confirm()}
                  >
                    {(mutateJob, { loading, error, data }) => (
                      <div>
                        {/*This formik form replaced a base html form.
                        note_variables is the variables object given to the mutation
                        it is comprised of information from Formik's values object}
                        <Form
                          onSubmit={event => {
                            event.preventDefault();
                            let part_variables = {
                              name: values.name,
                              description: values.description,
                              job: values.job,
                              cost: values.cost
                            };

                            //  Here, we strip off any empty strings from the variables
                            for (let key in part_variables) {
                              if (part_variables[key] === "") {
                                if (this.props.mode === "edit")
                                  delete part_variables[key];
                              }
                            }
                            //  If we are in edit mode, we need to send up the part id.
                            if (this.props.mode === "edit")
                              part_variables.id = this.props.match.params.id;
                            //  Send the mutation ...
                            mutateJob({
                              variables: part_variables
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
                                component={TextField}
                                id="field-name"
                                label="Name"
                                name="name"
                                className={"modal_field"}
                                value={values.name}
                                helperText="Part Name"
                                margin="normal"
                              />
                            </Grid>
                            <Grid item xs={1} />
                            {/*This field uses the field class from our styles to
                      get a distinctive background color}
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
                            <Grid item xs={1} />
                           <Grid item xs={6}>
                             <Field
                               id="field-cost"
                               label="Cost"
                               name="cost"
                               className={"modal_field"}
                               value={values.cost}                            
                               margin="normal"
                            />
                      </Grid>
                            <Grid item xs={1} />
                            {/*The pulldown form items using the arrays we built above
                            <Grid item xs={6}>
                              <Field
                                id="field-job"
                                select="true"
                                label="Job"
                                name="job"
                                placeholder="Job"
                                className={classNames(
                                  classes.margin,
                                  classes.textField,
                                  classes.job_field
                                )}
                                 style={{ width: "194px", height: "55px" }}
                              >
                                {job_list.map(job => (
                                  <option key={job.value} value={job.value}>
                                    {job.label}
                                  </option>
                                ))}
                              </Field>
                            </Grid>
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
    window.location.reload();
    this.props.history.push("/parts");
  };
}

export default withRouter(withStyles(styles)(PartForm));
*/