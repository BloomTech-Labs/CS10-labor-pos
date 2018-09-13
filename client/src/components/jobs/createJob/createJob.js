import React, { Component } from 'react';
import { Form, Card, Button, Input, FormGroup, Label} from 'reactstrap';
export default class CreateJob extends Component {
  constructor(){
    super();
    this.state = {
      contractor: '',
      tag: '',
      name: '',
      complete: false,
      labor: '',
      parts: '',
      note: '',
      description: '',
      deadline: null,
      modified_at: null,
      created_at: null,
      posted: false
    }
  }

  // componentDidMount() {
  //   // this.resetForm;
  //   return null;
  // }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleReset = (e) => {
    this.setState({
      contractor: '',
      tag: '',
      name: '',
      complete: false,
      labor: '',
      parts: '',
      note: '',
      description: '',
      deadline: null,
      modified_at: null,
      created_at: null,
      posted: false
    })
    console.log(this.state);
    console.log(this.resetForm)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      contractor,
      tag,
      name,
      complete,
      labor,
      parts,
      description,
      deadline,
      modified_at,
      created_at,
    } = this.state;
    // TODO add a call to GraphQL to post to our server into the database
    this.setState({
      contractor: '',
      tag: '',
      name: '',
      complete: false,
      labor: null,
      parts: '',
      description: '',
      deadline: null,
      modified_at: null,
      created_at: null
    });
    //this.props.history.push(RouteForJobListView);
    console.log('Job Details Successfully posted');
    this.setState({posted: true});
  }
  render() {
    return (
      <div>
        <h1> Add a Job</h1>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
            <Label for="name"> Name </Label>
              <Input type="text" name="name" value={this.state.name} onChange={this.handleTextChange} placeholder="Job Name" />
            </FormGroup>
          <br/>
            <FormGroup>
              <Label for="email"> Email </Label>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleTextChange} placeholder="Email address" />
            </FormGroup>
            <br/>
            <FormGroup>
            <Label for="parts"> Parts </Label>
              <Input type="text" name="parts" value={this.state.parts} onChange={this.handleTextChange} placeholder="Parts" />
            </FormGroup>
              <br/>
            <FormGroup>
            <Label for="labor"> Labor </Label>
              <Input type="text" name="labor" value={this.state.labor} onChange={this.handleTextChange} placeholder="Labor Hours" />
            </FormGroup>
              <br/>
            <Button type="submit">Save</Button>
            <Button onClick={this.handleReset}>Cancel</Button>
            </Form>
        </Card>
      </div>
    )}
  }

  {/* // { this.state.posted ? <div>modal for post success message</div> : <div> modal for unsuccessful post</div> } */}
{/*
<FormGroup>
<Label for=""> </Label>
          <Input type="" name="" value={this.state.} onChange={this.handleTextChange} placeholder="" />
          </FormGroup>

*/}
