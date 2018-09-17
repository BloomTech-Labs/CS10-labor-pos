import React, { Component } from "react";
import { Form, Card, Button, Input, FormGroup, Label } from "reactstrap";
export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      oldPassword: "",
      newPassword: "",
      email: "",
      address: "",
      oldPasswordValid: false,
      newPasswordValid: false,
      successful: false
    };
  }

  handleTextChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log("submitting form");
    const { name, oldPassword, newPassword, email, address } = this.state;
    //TODO add call to GraphQL to add the state to the database
    console.log("form submitted!");
    this.setState({ successful: true });
  };

  handleCancel = () => {
    console.log("cancelling edit");
    this.setState({
      name: "",
      email: "",
      address: "",
      oldPassword: "",
      newPassword: "",
      oldPasswordValid: false,
      newPasswordValid: false,
      successful: false
    });
    console.log("edit canceled");
  };
  render() {
    return (
      <div>
        <h1> Settings </h1>
        <br />
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name"> Name </Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleTextChange}
                placeholder="Your Name"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="email"> Email </Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleTextChange}
                placeholder="Email"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="address"> Address </Label>
              <Input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleTextChange}
                placeholder="Address"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="oldPassword"> Old Password </Label>
              <Input
                type="password"
                name="oldPassword"
                value={this.state.oldPassword}
                onChange={this.handleTextChange}
                placeholder="Old password"
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="newPassword"> New Password </Label>
              <Input
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleTextChange}
                placeholder="New password"
              />
            </FormGroup>
            <br />
            <br />
            <Button type="submit">Save</Button>
            <Button type="button" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
