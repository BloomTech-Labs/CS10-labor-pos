import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import { CREATE_JOB } from "../../mutations";

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
    const { name, labor, description, deadline } = this.state;
    return (
      <div>
        <Mutation mutation={CREATE_JOB} onCompleted={() => this._confirm()}>
          {(createJob, { loading, error, data }) => (
            <div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  createJob({
                    variables: {
                      name: name,
                      labor: labor,
                      description: description,
                      deadline: deadline
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

  _confirm = async () => {
    this.props.handleLogin(); //TODO is this right?
  };
}

export default withRouter(AddJob);
