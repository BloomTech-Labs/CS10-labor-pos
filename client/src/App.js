import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber, yellow, grey, blueGrey } from "@material-ui/core/colors";
import { withStyles } from '@material-ui/core';
import { styles } from "./components/material-ui/styles.js";

class App extends Component {
  state = {
    theme_string: "desk"
  };

  handleChange = event => {
    this.setState({ theme_string: event.target.value });
    localStorage.setItem("theme_string", event.target.value);
  };

  componentDidMount = () => {
    //  We get dark_theme off local storage and cast it to a boolean before putting
    //  it in state so that theme settings persist between reloads.
    const theme_string = localStorage.getItem("theme_string") || "desk";
    this.setState({ theme_string: theme_string });
  };

  render() {
    //  The app will default to a light theme unless the dark_theme variable is set.

    let primary_color = yellow;
    let secondary_color = amber;
    let textfield_color, theme_type, lightened_background, default_color, paper_color, base_background, sidenav_background;
    switch (this.state.theme_string) {
      case 'forest':
        theme_type = "dark";
        lightened_background = grey["700"];
        default_color = "#584A00";
        paper_color = "#262600";
        base_background = "#130e00";
        sidenav_background = "#262600";
        break;
    case "ugly":
      theme_type = "dark";
      lightened_background = "#388E3C";
      default_color = "#FF6D00";
      paper_color = "#F50057";
      base_background = "#673AB7";
      sidenav_background = "#F50057";
      textfield_color = "#00FF00";
      break;
    case "darkgold":
      theme_type = "dark";
      lightened_background = grey["700"];
      default_color = "#5a4000";
      paper_color = "#130e00";
      base_background = "#130e00";
      sidenav_background = "#000000";
      break;
    case "banana":
      theme_type = "light";
      lightened_background = grey["700"];
      default_color = "#d4c253";
      paper_color = "#f0e370";
      base_background = "#846c04";
      sidenav_background = "#f0e370";
      break;
    case "greyscale":
      theme_type = "dark";
      default_color = "#191919";
      paper_color = "#4c4c4c";
      lightened_background = grey["700"];
      sidenav_background = "#191919";
      base_background = "#ffffff";
      break;
    default:
      textfield_color = "#130e00";
      theme_type = "dark";
      lightened_background = grey["700"];
      default_color = blueGrey["900"];
      paper_color = grey["800"];
      base_background = blueGrey["500"];
      sidenav_background = grey["800"];
    }
    //  Create the theme for the app.

    const font = "'Soure Sans Pro', sans-serif";

    const theme = createMuiTheme({
      palette: {
        type: theme_type,
        primary: primary_color,
        secondary: secondary_color,
        lightened_background: lightened_background,
        background: {
          paper: paper_color,
          default: default_color,
          sidenav: sidenav_background,
          textfield: textfield_color
        }
      },
      typography: {
        fontFamily: font
      }
    });

    const { classes } = this.props;
    return (
      <div className="App">
        <div
          style={{
            backgroundColor: base_background,
          }}
          className={`${this.state.theme_string} ${classes.app}`}
        >
          <MuiThemeProvider theme={theme}>
            {/*  We pass the themeControlMethod and dark_theme down all the way to SideNav
              so that it can communicate with App*/}
            <LandingPage
              themeControlMethod={this.handleChange}
              theme_string={this.state.theme_string}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
