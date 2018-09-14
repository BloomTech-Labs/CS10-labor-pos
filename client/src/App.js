import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import CreateJob from './components/jobs/createJob/createJob';
import Settings from './components/settings/settings';
import Login from './Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/create-job" component={CreateJob}/>
        <Route exact path="/settings" component={Settings}/>
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
