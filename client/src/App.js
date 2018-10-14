import React, { Component } from "react";
import "./App.css";
import { LandingPage } from "./components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber, yellow, grey, blueGrey } from "@material-ui/core/colors";
import desk_image from "./background.jpg";
import raccoon from "./goldracoon.png";

class App extends Component {
  state = {
    theme_string: "default"
  };

  handleChange = event => {
    this.setState({ theme_string: event.target.value });
    localStorage.setItem("theme_string", event.target.value);
  };

  componentDidMount = () => {
    //  We get dark_theme off local storage and cast it to a boolean before putting
    //  it in state so that theme settings persist between reloads.
    const theme_string = localStorage.getItem("theme_string");
    this.setState({ theme_string: theme_string });
  };

  render() {
    //  The app will default to a light theme unless the dark_theme variable is set.
    let theme_type = "dark";
    let lightened_background = grey["700"];
    let default_color = "#5a4000";
    let paper_color = "#130e00";
    let primary_color = yellow;
    let secondary_color = amber;
    let base_background = "#130e00";
    let sidenav_background = "#000000";
    let textfield_color = "#130e00";
    let background_image = false;
    if (this.state.theme_string === "forest") {
      theme_type = "dark";
      lightened_background = grey["700"];
      default_color = "#584A00";
      paper_color = "#262600";
      sidenav_background = "#262600";
    } else if (this.state.theme_string === "ugly") {
      theme_type = "dark";
      lightened_background = "#388E3C";
      default_color = "#FF6D00";
      paper_color = "#F50057";
      base_background = "#673AB7";
      sidenav_background = "#F50057";
      textfield_color = "#00FF00";
      background_image = raccoon;
    } else if (this.state.theme_string === "bluegrey") {
      theme_type = "dark";
      lightened_background = grey["700"];
      default_color = blueGrey["900"];
      paper_color = grey["800"];
      base_background = blueGrey["500"];
      sidenav_background = grey["800"];
      background_image = desk_image;
    } else if (this.state.theme_string === "banana") {
      theme_type = "light";
      lightened_background = grey["100"];
      default_color = "#d4c253";
      paper_color = "#f0e370";
      primary_color = yellow;
      secondary_color = amber;
      base_background = "#846c04";
      sidenav_background = "#f0e370";
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
          default: default_color,
          sidenav: sidenav_background,
          textfield: textfield_color
        }
      }
    });

    return (
      <div className="App">
        <div
          style={{
            backgroundColor: base_background,
            width: "auto",
            height: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${background_image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat"
          }}
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

export default App;
