import React, { Component } from "react";
import { Button, Dialog } from "@material-ui/core";
import "./landingpage.css";
import { Login, NewUser, NewContractor, Home } from "../../components";
import { AUTH_TOKEN } from "../../constants";

//This is the component for users who arrive at the site without being logged in.
//It renders path-insensitively; if the user is not logged in, any path will
//show this component
//It presents the user with information about our app and what it can do
//As well as the opportunity to log in or sign up.
class LandingPage extends Component {
  //This component uses its state to track some important variables.
  //Moving forward, as I see it, we have 3 options:
  //1. We can have state on many components and just store stuff where its used and needed,
  //if absolutely necessary passing things back up to parent components with methods
  //2. Use this state as a single source of truth for its child components via
  //"prop drilling"
  //3. Use context or something similar.
  constructor() {
    super();
    this.state = {
      login_modal: false,
      create_modal: false,
      contractor_modal: false,
      contractor_id: "42"
    };
  }

  //This methid is passed down to the user modal component
  //so that it can affect the state of this component.
  setUserId = new_id => {
    this.setState({ contractor_id: new_id });
  };

  //This method is passed down to the contractor modal
  //The contractor modal uses it to close itself and open
  //the login modal.
  handleLogin = () => {
    this.setState({ login_modal: true, contractor_modal: false });
  };

  //This method is used to open the create user modal.
  handleCreateButton = () => {
    this.setState({ create_modal: true });
  };

  //This method is passed to the create user modal
  //so it can close itself and open the contractor
  //modal.
  handleContractorButton = () => {
    this.setState({ create_modal: false, contractor_modal: true });
  };

  //This is a multipurpose method to close all modals.
  handleCloseModals = () => {
    this.setState({
      login_modal: false,
      contractor_modal: false,
      create_modal: false
    });
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    //If the user is authenticated, we render the home component instead.
    if (authToken) {
      return <Home />;
    }
    //If the user is not authenticated, we go ahead and render this component.
    //TODO: make this actually present a case for using our app.
    else {
      return (
        <div className="landing-page">
          <div className="landing-buttons">
            <Button color="primary" onClick={this.handleCreateButton}>
              Create Account
            </Button>
            <Button color="secondary" onClick={this.handleLogin}>
              Log In
            </Button>
          </div>
          <div classNahandleCloseModalsme="landing-blurb">
            <p>
              Placeholder for the blurb!!!\nLorem ipsum dolor sit amet,
              consectetur adipiscing elit. Aliquam volutpat tempor augue, quis
              venenatis ligula volutpat et. Mauris ac rhoncus ipsum. Donec et
              sodales magna. Sed sed varius sem, non convallis tellus. Mauris
              maximus dignissim nibh at pretium. Donec posuere semper leo, eu
              porttitor metus consequat eget. Aliquam in molestie lectus, sit
              amet euismod purus. Interdum et malesuada fames ac ante ipsum
              primis in faucibus. Quisque non ligula sagittis, fermentum neque
              id, cursus orci. Donec porta, tellus suscipit placerat luctus,
              odio leo imperdiet lorem, a ultrices lorem augue vel ipsum. Fusce
              vel pretium ligula. Nunc posuere, augue a fringilla euismod, erat
              tortor sollicitudin felis, a luctus velit enim id mi. Duis sodales
              bibendum eros non vulputate. Donec volutpat dolor eget libero
              ultrices congue sit amet at ante. Cras a risus quis quam finibus
              molestie nec id neque. Morbi blandit bibendum lacus, ut porttitor
              dolor efficitur sed. Sed sit amet tortor nulla. Morbi rhoncus ex
              vitae ligula feugiat, semper convallis turpis eleifend. In
              venenatis nibh non quam lacinia feugiat. Integer dui felis,
              fringilla eu tempus eget, tincidunt id eros. Nulla iaculis augue
              ligula, dictum imperdiet nunc rutrum eu. Integer in tortor quis
              tortor volutpat accumsan vel non tortor. Quisque sodales eleifend
              tortor, quis consequat risus cursus sit amet. Sed ultricies
              consectetur nibh, in sollicitudin nulla porttitor ac. Proin
              molestie varius lacus non venenatis. Donec nec cursus mauris.
              Proin ultricies ipsum at purus varius, in tincidunt diam pretium.
              Nunc mattis mauris nunc, et vehicula mauris mollis euismod. Nullam
              quam ligula, blandit volutpat sem sit amet, tincidunt bibendum
              lacus. Curabitur et purus lorem. Ut faucibus aliquet imperdiet.
            </p>
          </div>
          {/*We use material ui dialog components for our modals.*/}
          <Dialog
            open={this.state.login_modal}
            onClose={this.handleCloseModals}
            className="login-modal"
          >
            <Login modalDone={this.handleCloseModals} />
          </Dialog>
          <Dialog
            open={this.state.create_modal}
            onClose={this.handleCloseModals}
            className="user-modal"
          >
            <NewUser
              parentInfoMethod={this.setUserId.bind(this)}
              modalDone={this.handleContractorButton}
            />
          </Dialog>
          <Dialog
            open={this.state.contractor_modal}
            onClose={this.handleCloseModals}
            className="contractor-modal"
          >
            <NewContractor
              userId={this.state.contractor_id}
              modalDone={this.handleLogin}
            />
          </Dialog>
        </div>
      );
    }
  }
}

export default LandingPage;
