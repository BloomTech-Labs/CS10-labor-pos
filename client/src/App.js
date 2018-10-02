import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  state = {
    dark_theme: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    let theme_type = "light";
    if (this.state.dark_theme) theme_type = "dark";
    const theme = createMuiTheme({
      palette: {
        type: theme_type
      }
    });
    return (
      <div className="App">
        <div className="hero-image">
          <MuiThemeProvider theme={theme}>
            <LandingPage
              themeControlMethod={this.handleChange}
              dark_theme={this.state.dark_theme}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
