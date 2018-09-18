import React, { Component } from "react";
import { Button, Dialog } from "@material-ui/core";
import "./landingpage.css";
import Login from "../auth/login";
import NewUser from "../auth/newuser";
import NewContractor from "../auth/newcontractor";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      login_modal: false,
      create_modal: false,
      contractor_modal: false,
      contractor_id: "42"
    };
  }

  setUserId = new_id => {
    this.setState({ contractor_id: new_id });
  };

  handleLogin = () => {
    this.setState({ login_modal: true, contractor_modal: false });
  };

  handleCreateButton = () => {
    this.setState({ create_modal: true });
  };

  handleContractorButton = () => {
    this.setState({ create_modal: false, contractor_modal: true });
  };

  handleCloseLogin = () => {
    this.setState({ login_modal: false });
  };

  handleCloseCreate = () => {
    this.setState({ create_modal: false });
  };

  handleCloseContractor = () => {
    this.setState({ contractor_modal: false });
  };

  handleCloseModals = () => {
    this.setState({
      login_modal: false,
      contractor_modal: false,
      create_modal: false
    });
  };

  render() {
    return (
      <div className="landing-page">
        <div className="landing-buttons">
          <Button color="primary" onClick={this.handleCreateButton}>
            Create Account
          </Button>
          <Button color="secondary" onClick={this.handleLoginButton}>
            Log In
          </Button>
        </div>
        <div className="landing-blurb">
          <p>
            Placeholder for the blurb!!!\nLorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aliquam volutpat tempor augue, quis
            venenatis ligula volutpat et. Mauris ac rhoncus ipsum. Donec et
            sodales magna. Sed sed varius sem, non convallis tellus. Mauris
            maximus dignissim nibh at pretium. Donec posuere semper leo, eu
            porttitor metus consequat eget. Aliquam in molestie lectus, sit amet
            euismod purus. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Quisque non ligula sagittis, fermentum neque id, cursus
            orci. Donec porta, tellus suscipit placerat luctus, odio leo
            imperdiet lorem, a ultrices lorem augue vel ipsum. Fusce vel pretium
            ligula. Nunc posuere, augue a fringilla euismod, erat tortor
            sollicitudin felis, a luctus velit enim id mi. Duis sodales bibendum
            eros non vulputate. Donec volutpat dolor eget libero ultrices congue
            sit amet at ante. Cras a risus quis quam finibus molestie nec id
            neque. Morbi blandit bibendum lacus, ut porttitor dolor efficitur
            sed. Sed sit amet tortor nulla. Morbi rhoncus ex vitae ligula
            feugiat, semper convallis turpis eleifend. In venenatis nibh non
            quam lacinia feugiat. Integer dui felis, fringilla eu tempus eget,
            tincidunt id eros. Nulla iaculis augue ligula, dictum imperdiet nunc
            rutrum eu. Integer in tortor quis tortor volutpat accumsan vel non
            tortor. Quisque sodales eleifend tortor, quis consequat risus cursus
            sit amet. Sed ultricies consectetur nibh, in sollicitudin nulla
            porttitor ac. Proin molestie varius lacus non venenatis. Donec nec
            cursus mauris. Proin ultricies ipsum at purus varius, in tincidunt
            diam pretium. Nunc mattis mauris nunc, et vehicula mauris mollis
            euismod. Nullam quam ligula, blandit volutpat sem sit amet,
            tincidunt bibendum lacus. Curabitur et purus lorem. Ut faucibus
            aliquet imperdiet.
          </p>
        </div>
        <Dialog
          open={this.state.login_modal}
          onClose={this.handleCloseLogin}
          className="login-modal"
        >
          <Login closeModals={this.handleCloseModals} />
        </Dialog>
        <Dialog
          open={this.state.create_modal}
          onClose={this.handleCloseCreate}
          className="user-modal"
        >
          <NewUser
            parentInfoMethod={this.setUserId.bind(this)}
            myMethod={this.handleContractorButton}
          />
        </Dialog>
        <Dialog
          open={this.state.contractor_modal}
          onClose={this.handleCloseContractor}
          className="contractor-modal"
        >
          <NewContractor
            userId={this.state.contractor_id}
            handleLogin={this.handleLogin}
          />
        </Dialog>
      </div>
    );
  }
}

export { LandingPage };
