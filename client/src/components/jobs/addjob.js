import React, { Component } from "react";
import { TextField, Button, MenuItem, Grid } from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router";
import { CREATE_JOB } from "../../mutations";
import { QUERY_ALL_CLIENTS } from "../../queries";

//  This component will render the forms to create and edit jobs.
//

//https://balsamiq.cloud/sc1hpyg/po5pcja/rB029
class AddJob extends Component {
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

  render() {
    const { client, name, labor, description, deadline, complete } = this.state;
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
                mutation={CREATE_JOB}
                onCompleted={() => this._confirm()}
              >
                {(createJob, { loading, error, data }) => (
                  <div>
                    <h1>Add Job</h1>
                    <form
                      onSubmit={event => {
                        event.preventDefault();
                        createJob({
                          variables: {
                            client: client,
                            name: name,
                            labor: labor,
                            description: description,
                            deadline: deadline,
                            complete: complete
                          }
                        });
                        this.setState({
                          name: "",
                          labor: "",
                          description: "",
                          deadline: ""
                        });
                      }}
                    >
                      <Grid container>
                        <Grid xs={6}>
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
                        <Grid xs={6}>
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
                        <Grid xs={12}>
                          <TextField
                            id="field-description"
                            label="Description"
                            multiline
                            fullWidth
                            rows="8"
                            rowsMax="8"
                            name="description"
                            className={"modal_field"}
                            value={description}
                            onChange={this.handleChange("description")}
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <TextField
                          id="field-labor"
                          label="Labor"
                          name="labor"
                          className={"modal_field"}
                          value={labor}
                          onChange={this.handleChange("labor")}
                          margin="normal"
                        />

                        <TextField
                          id="field-deadline"
                          label="Deadline"
                          name="deadline"
                          className={"modal_field"}
                          value={deadline}
                          onChange={this.handleChange("deadline")}
                          margin="normal"
                        />
                        <Button type="submit">Create Job</Button>
                      </Grid>
                    </form>
                    {loading && <p>Saving job information</p>}
                    {(data || error) && <p>Success!</p>}
                  </div>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }

  _confirm = async () => {
    this.props.handleLogin(); //TODO is this right?
  };
}

export default withRouter(AddJob);
