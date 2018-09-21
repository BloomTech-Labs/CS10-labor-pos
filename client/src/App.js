import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="hero-image">
          <LandingPage />
        </div>
      </div>
    );
  }
}

export default App;
