import React, { Component } from "react";
// import { AUTH_TOKEN } from "../../constants";
import gql from "graphql-tag"; 
import { TextField, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

const CREATE_JOB = gql`
  mutation createJob(
    $clientID: ID!
    $name: String!
    $labor: Float!
    $description: String!
  ) {
    createJob(clientId: $clientId, name: $name, labor: $labor, description: $description, complete: $complete,createdAt: $createdAt, modifiedAt: $modifiedAt, deadline: $deadline) {
      client
      name
      description
      labor
      complete
      created_at
      modified_at
      deadline
    } 
  }
  `;

class NewJob extends Component {
  state = {
    name: "",
    labor: "",
    description: "",
    deadline: "",
   };

   handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const {
      name,
      labor, 
      description,
      deadline,
    } = this.state;
    return (
      <div>
        <Mutation
          mutation={CREATE_JOB}
          onCompleted={() => this._confirm()}
        >
        {(createJob, { loading, error, data }) => (
          <div>
            <form
              onSubmit ={event => {
                event.preventDefault();
                createJob({
                  variables: {
                    name: name,
                    labor: labor,
                    description: description,
                    deadline: deadline,
                    //clientId: this.props.clientId
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
              id="field-description"
              label="Description"
              name="description"
              className={"modal_field"}
              value={description}
              onChange={this.handleChange("description")}
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
          </form>
          {loading && <p>Saving job information</p>}
          {(data || error) && <p>Success!</p>}
        </div>    
        )}
      </Mutation>
    </div>
    );
            }

  _confirm= async () => {
    this.props.handleLogin(); //TODO is this right?
  };
}

export default NewJob;
      
