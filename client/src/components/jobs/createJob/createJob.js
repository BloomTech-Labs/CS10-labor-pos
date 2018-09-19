import React, { Component } from "react";
// import { AUTH_TOKEN } from "../../constants";
import gql from "graphql-tag"; 
import { TextField, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";

const CREATE_JOB = gql`
  mutation createJob(
    $userID: ID!
    $name: String!
    $labor: 
    $description: String!
  ) {
    createJob(userId: $userId, name: $name, labor: $labor, description: $description) {
      name
      description
    } 
  }
  `;

class NewJob extends Component {
  state = {
    userID: "",
    name: "",
    labor: "",
    description: "",
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
      description
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
                    userId: this.props.userId
                  }
                });
                this.setState({
                  name: "",
                  labor: "",
                  description: ""
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
      
