import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";

//Link to the balsamiq reference: https://balsamiq.cloud/sc1hpyg/po5pcja/rB029

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
