import React, { Component } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  withStyles
} from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router";
import { CREATE_JOB, UPDATE_JOB } from "../../mutations";
import { QUERY_ALL_CLIENTS } from "../../queries";
import { styles } from "../material-ui/styles.js";

//  This component will render the forms to create and edit jobs.
//
//  PROPS:
//    mode: Accepts "create" or "edit"; indicates what the component should be doing
//    job: In edit mode, a job will be passed down from the parent component.

//https://balsamiq.cloud/sc1hpyg/po5pcja/rB029
class JobForm extends Component {
  state = {
    client: "",
    name: "",
    labor: "",
    description: "",
    deadline: "",
    complete: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  toggleComplete = event => {
    this.setState({ complete: event.target.checked });
  };

  componentDidMount = () => {
    if (this.props.mode === "edit") {
      let edit_job = {};
      for (let key in this.props.job) {
        if (this.props.job[key] === null || this.props.job[key] === undefined)
          edit_job[key] = "";
        else edit_job[key] = this.props.job[key];
      }
      this.setState({
        client: edit_job.client.id,
        name: edit_job.name,
        labor: edit_job.labor,
        description: edit_job.description,
        deadline: edit_job.deadline,
        complete: edit_job.complete
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { client, name, labor, description, deadline, complete } = this.state;
    let chosen_mutation = CREATE_JOB;
    let title_text = "Add Job";
    let button_text = "Create";
    if (this.props.mode === "edit") {
      chosen_mutation = UPDATE_JOB;
      title_text = `Update ${this.props.job.name}`;
      button_text = "Update";
    }
    return (
      <div>
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
              <Mutation
                mutation={chosen_mutation}
                onCompleted={() => this._confirm()}
              >
                {(mutateJob, { loading, error, data }) => (
                  <div>
                    <form
                      onSubmit={event => {
                        event.preventDefault();
                        let job_variables = {
                          client: client,
                          name: name,
                          labor: labor,
                          description: description,
                          deadline: deadline,
                          complete: complete
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
                        this.setState({
                          client: "",
                          name: "",
                          labor: "",
                          description: "",
                          deadline: "",
                          complete: false
                        });
                      }}
                    >
                      <Typography
                        className={classes.typography}
                        variant="title"
                      >
                        {title_text}
                      </Typography>
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
                            id="field-name"
                            label="Name"
                            name="name"
                            className={"modal_field"}
                            value={name}
                            onChange={this.handleChange("name")}
                            helperText="Job Name"
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
                        <Grid item xs={4}>
                          <TextField
                            id="field-labor"
                            label="Labor"
                            name="labor"
                            className={"modal_field"}
                            value={labor}
                            onChange={this.handleChange("labor")}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={complete}
                                onChange={this.toggleComplete}
                                value="complete"
                              />
                            }
                            label="Job Complete"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="field-deadline"
                            label="Deadline"
                            name="deadline"
                            className={"modal_field"}
                            value={deadline}
                            onChange={this.handleChange("deadline")}
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.padded_button}
                            type="submit"
                          >
                            {button_text}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                    {loading && <p>Saving job information...</p>}
                    {error && <p>{error}</p>}
                  </div>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }

  _confirm = () => {
    window.location.reload();
    this.props.history.push("/jobs");
  };
}

export default withRouter(withStyles(styles)(JobForm));
