import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import CreateJob from './components/jobs/createJob/createJob'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/create-job" component={CreateJob}/>
      </div>
    );
  }
}

export default App;
