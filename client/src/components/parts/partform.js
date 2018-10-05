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
import { CREATE_PART, UPDATE_PART } from "../../mutations.js";
import { QUERY_ALL_JOBS } from "../../queries.js";
import { styles } from "../material-ui/styles.js";

//  This component will render on the /parts/:id/edit route when the user is logged in
//  It is a child of the home component.
//  It will present the user with prepopulated form fields to update a part.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r29EA
class PartForm extends Component {
  state = {
    name: "",
    description: "",
    cost: "",
    job: ""
  };

  componentDidMount = () => {
    if (this.props.mode === "edit") {
      let edit_part = {};
      for (let key in this.props.part) {
        if (this.props.part[key] === null) edit_part[key] = "";
        else edit_part[key] = this.props.part[key];
      }
      if (!edit_part.job) edit_part.job = { id: "" };
      this.setState({
        name: edit_part.name,
        job: edit_part.job.id,
        description: edit_part.description,
        cost: edit_part.cost
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { name, description, cost, job } = this.state;
    let chosen_mutation = CREATE_PART;
    let title_text = "Add Part";
    let button_text = "Create";
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_PART;
      title_text = `Update ${this.props.part.name}`;
      button_text = "Update";
    }
    return (
      <Query query={QUERY_ALL_JOBS}>
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
            <Mutation
              mutation={chosen_mutation}
              onCompleted={() => this._confirm()}
            >
              {(mutateJob, { loading, error, data }) => (
                <div>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      let part_variables = {
                        name: name,
                        description: description,
                        job: job,
                        cost: cost
                      };

                      for (let key in part_variables) {
                        if (part_variables[key] === "") {
                          if (this.props.mode === "edit")
                            delete part_variables[key];
                        }
                      }
                      if (this.props.mode === "edit")
                        part_variables.id = this.props.match.params.id;
                      mutateJob({
                        variables: part_variables
                      });
                      this.setState({
                        name: "",
                        description: "",
                        job: "",
                        cost: ""
                      });
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.typography}
                          variant="title"
                        >
                          {title_text}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="field-name"
                          label="Name"
                          name="name"
                          className={"modal_field"}
                          value={name}
                          onChange={this.handleChange("name")}
                          helperText="Part Name"
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <TextField
                          id="field-description"
                          label="Description"
                          multiline
                          fullWidth
                          rows="8"
                          rowsMax="8"
                          name="description"
                          className={classes.field}
                          value={description}
                          onChange={this.handleChange("description")}
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={6}>
                        <TextField
                          id="field-cost"
                          label="Cost"
                          name="cost"
                          className={"modal_field"}
                          value={cost}
                          onChange={this.handleChange("cost")}
                          margin="normal"
                        />
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
                      <Button
                        className={classes.padded_button}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {button_text}
                      </Button>
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
    this.props.history.push("/parts");
  };
}

export default withRouter(withStyles(styles)(PartForm));
