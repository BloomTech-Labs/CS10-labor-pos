import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber, orange, blueGrey, grey } from "@material-ui/core/colors";

class App extends Component {
  state = {
    dark_theme: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    localStorage.setItem(name, event.target.checked);
  };

  componentDidMount = () => {
    //  We get dark_theme off local storage and cast it to a boolean before putting
    //  it in state so that theme settings persist between reloads.
    const dark_theme = localStorage.getItem("dark_theme");
    this.setState({ dark_theme: dark_theme === "true" });
  };

  render() {
    //  The app will default to a light theme unless the dark_theme variable is set.
    let theme_type = "light";
    let lightened_background = grey["100"];
    let default_color = blueGrey["50"];
    let paper_color = grey["50"];
    let primary_color = amber;
    let secondary_color = orange;
    if (this.state.dark_theme) {
      theme_type = "dark";
      lightened_background = grey["700"];
      default_color = blueGrey["900"];
      paper_color = grey["800"];
    }
    //  Create the theme for the app.
    const theme = createMuiTheme({
      palette: {
        type: theme_type,
        primary: primary_color,
        secondary: secondary_color,
        lightened_background: lightened_background,
        background: {
          paper: paper_color,
          default: default_color
        }
      }
    });
    return (
      <div className="App">
        <div className="hero-image">
          <MuiThemeProvider theme={theme}>
            {/*  We pass the themeControlMethod and dark_theme down all the way to SideNav
              so that it can communicate with App*/}
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
