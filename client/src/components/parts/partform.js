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
import { CREATE_PART, UPDATE_PART } from "../../mutations.js";
import { QUERY_ALL_JOBS } from "../../queries.js";
import { styles } from "../material-ui/styles.js";
import { Formik, Form, Field } from "formik";
import { TextField } from "../../components";
import classNames from "classnames";
const Yup = require("yup");

//  This component will render on the /parts/:id/edit route when the user is logged in
//  It is a child of the home component.
//  It will present the user with prepopulated form fields to update a part.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r29EA
//Schema for validation
const PartSchema = Yup.object().shape({
  name: Yup.string()
    .max(150, "Name must be under 100 characters")
    .required(),
  description: Yup.string(),
  cost: Yup.number()
    .required()
    .max(1000000000, "Cost must be less than 1,000,000,000"),
  job: Yup.string()
});

class PartForm extends Component {
  render() {
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
    // if in edit mode we change values to reflect that
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_PART;
      title_text = `Update ${this.props.part.name}`;
      button_text = "Update";
      // load in values of item we're updating
      for (let key in this.props.part) {
        if (this.props.part[key] === null) edit_part[key] = "";
        else edit_part[key] = this.props.part[key];
      }
      //  Load in either the appropriate ids or empty strings for jobs
      if (edit_part.job) edit_part.job = edit_part.job.id;
    } else if (this.props.mode === "modal") {
      edit_part.job = this.props.parent.id;
    }

    return (
      <Query query={QUERY_ALL_JOBS}>
      // retrieves job data so that part can be attached to specific job
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
          return (
            <Formik
              initialValues={{
                job: edit_part.job,
                name: edit_part.name,
                cost: edit_part.cost,
                description: edit_part.description
              }}
              // tells formik to validate against our pre-defined Part Schema
              validationSchema={PartSchema}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
            // checks that values are valid and then performs mutation
              {({ values, isValid }) => {
                return (
                  <Mutation
                    mutation={chosen_mutation}
                    onCompleted={() => this._confirm()}
                  >
                    {mutatePart => (
                      <div>
                        <Form
                          onSubmit={event => {
                            event.preventDefault();
                            let part_variables = {
                              name: values.name,
                              description: values.description,
                              job: values.job,
                              cost: values.cost
                            };

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
                            mutatePart({
                              variables: part_variables
                            });
                          }}
                        >
                          <Grid container>
                            <Grid container justify="center">
                              <Typography
                                className={classes.typography_title}
                                variant="title"
                              >
                                {title_text}
                              </Typography>
                            </Grid>
                            <Grid container justify="center">
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
                            <Grid item xs={10}>
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
                            <Grid item xs={12} md={6}>
                              <Grid
                                container
                                justify="center"
                                alignContent="center"
                                alignItems="center"
                                direction="column"
                              >
                                <Field
                                  component={TextField}
                                  id="field-cost"
                                  label="Cost"
                                  name="cost"
                                  className={"modal_field"}
                                  value={values.cost}
                                  margin="normal"
                                />
                                <div
                                  style={{
                                    color: "white",
                                    textShadow: "2px 2px black"
                                  }}
                                >
                                  Note: Maximum cost form allows is
                                  $1,000,000,000
                                </div>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Grid
                                container
                                justify="center"
                                alignContent="center"
                                alignItems="center"
                                direction="column"
                              >
                                <Field
                                  component="select"
                                  id="field-job"
                                  disabled={this.props.mode === "modal"}
                                  label="Job"
                                  name="job"
                                  placeholder="Job"
                                  style={{
                                    width: "194px",
                                    height: "50px"
                                  }}
                                  className={classNames(
                                    classes.margin,
                                    classes.textField,
                                    classes.state_field
                                  )}
                                >
                                  {job_list.map(job => (
                                    <option key={job.value} value={job.value}>
                                      {job.label}
                                    </option>
                                  ))}
                                  >
                                </Field>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justify="space-around"
                            className={classes.margin}
                          >
                            <Hidden xsUp={this.props.mode !== "modal"}>
                              <Button
                                onClick={this.props.cancelAdd}
                                variant="contained"
                                color="secondary"
                                className={classes.padded_button}
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
    this.props.cancelAdd();
    this.props.refetch();
  };
}

export default withRouter(withStyles(styles)(PartForm));
