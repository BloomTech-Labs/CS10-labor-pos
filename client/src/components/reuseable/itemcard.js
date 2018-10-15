import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import { IconButton, Typography, Dialog, Grid } from "@material-ui/core";
import Loadable from "react-loadable";

function Loading({ error }) {
  if (error) {
    return <p>{error}</p>;
  } else {
    return <h3>Loading...</h3>;
  }
}

const DeleteItem = Loadable({
  loader: () => import("../../components/reuseable/deleteitem.js"),
  loading: Loading
});
//  This component will render as a child of the card list component.
//  It presents a small area of preview information for an individual item.
//  Displays the item name as well as edit and delete buttons.

//  PROPS:
//    item: The item to be displayed.
//    type: The item's type.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r0C2B
class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false
    };
  }

  handleDeleteButton = () => {
    this.setState({ deleting: true });
  };

  cancelDelete = () => {
    this.setState({ deleting: false });
  };

  render() {
    let topRow = "";
    let middleRow = "";
    let bottomRow = "";

    /*  No longer using this.props.type being passed down from Cardlist
    That logic was breaking when it came to going to /client because
    it seemed to think that /client's type was client/note/job
    Now taking this.props.match.path off of React router */

    switch (this.props.type) {
      case "job":
        if (this.props.item.client.businessName) {
          topRow = (
            <React.Fragment>
              <b>Client:</b> <br />
              {`${this.props.item.client.businessName}`}{" "}
            </React.Fragment>
          );
        } else {
          topRow = (
            <React.Fragment>
              <b>Client:</b> <br />
              {`${this.props.item.client.firstName} ${
                this.props.item.client.lastName
              }`}
            </React.Fragment>
          );
        }
        middleRow = (
          <React.Fragment>
            <b>Job:</b> <br /> {`${this.props.item.name}`}
          </React.Fragment>
        );
        if (this.props.item.deadline) {
          bottomRow = `Due: ${this.props.item.deadline}`;
        } else {
          bottomRow = "No deadline";
        }
        break;
      case "client":
        if (this.props.item.businessName)
          middleRow = this.props.item.businessName;
        else
          middleRow = `${this.props.item.firstName} ${
            this.props.item.lastName
          }`;
        break;
      case "note":
        topRow = (
          <React.Fragment>
            <b>Title:</b> <br /> {`${this.props.item.title}`}
          </React.Fragment>
        );
        if (this.props.item.client) {
          if (this.props.item.client.businessName) {
            middleRow = (
              <React.Fragment>
                Client: <br /> {`${this.props.item.client.businessName}`}
              </React.Fragment>
            );
          } else {
            middleRow = (
              <React.Fragment>
                Client: <br />{" "}
                {`${this.props.item.client.firstName} ${
                  this.props.item.client.lastName
                }`}
              </React.Fragment>
            );
          }
        } else if (this.props.item.job) {
          middleRow = (
            <React.Fragment>
              Job: <br /> {`${this.props.item.job.name}`}
            </React.Fragment>
          );
        }
        if (this.props.item.client) {
          if (this.props.item.job) {
            bottomRow = (
              <React.Fragment>
                Job: <br /> {`${this.props.item.job.name}`}
              </React.Fragment>
            );
          }
        }
        break;
      case "part":
        middleRow = this.props.item.name;
        break;
      default:
        break;
    }
    return (
      <div>
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Link to={`/${this.props.type}s/${this.props.item.id}/edit`}>
              <IconButton>
                <Create />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={this.handleDeleteButton}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        <Link to={`/${this.props.type}s/${this.props.item.id}`}>
          <Typography variant="subheading" noWrap>
            {topRow}
          </Typography>
          <Typography variant="subheading" noWrap>
            {middleRow}
          </Typography>
          <Typography variant="subheading" noWrap>
            {bottomRow}
          </Typography>
        </Link>
        <Dialog
          open={this.state.deleting}
          onClose={this.cancelDelete}
          className="delete-modal"
        >
          <DeleteItem
            cancelDelete={this.cancelDelete}
            type={this.props.type}
            item={this.props.item}
            refetch={this.props.refetch}
          />
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ItemCard);
