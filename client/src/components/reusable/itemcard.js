import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Create from "@material-ui/icons/Create.js";
import Delete from "@material-ui/icons/Delete.js";
import {
  IconButton,
  Typography,
  Dialog,
  Grid,
  withStyles
} from "@material-ui/core";
import Loadable from "react-loadable";
import { styles } from "../material-ui/styles.js";

function Loading({ error }) {
  if (error) {
    return <Typography>{error}</Typography>;
  } else {
    return <Typography>Loading...</Typography>;
  }
}

const DeleteItem = Loadable({
  loader: () => import("../../components/reusable/deleteitem.js"),
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
    const { classes } = this.props;
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
          middleRow = (
            <React.Fragment>
              <span className={classes.highlight} style={{ fontSize: "18px" }}>
                Client:
              </span>
              &nbsp;&nbsp;
              <span className={classes.highlight}>
                {`${this.props.item.client.businessName}`}{" "}
              </span>
            </React.Fragment>
          );
        } else {
          middleRow = (
            <React.Fragment>
              <span className={classes.highlight} style={{ fontSize: "18px" }}>
                Client:
              </span>
              &nbsp;&nbsp;
              <span className={classes.highlight}>{`${
                this.props.item.client.firstName
              } ${this.props.item.client.lastName}`}</span>
            </React.Fragment>
          );
        }
        topRow = (
          <React.Fragment>
            <span style={{ fontSize: "18px" }}>Job:</span> &nbsp;&nbsp;
            <span>{`${this.props.item.name}`}</span>
          </React.Fragment>
        );
        if (this.props.item.deadline) {
          bottomRow = (
            <React.Fragment>
              <span style={{ fontSize: "18px" }}>Due:</span>
              &nbsp;&nbsp;
              <span className={classes.highlight}>
                {this.props.item.deadline}
              </span>
            </React.Fragment>
          );
        } else {
          bottomRow = "No deadline";
        }
        break;
      case "client":
        if (this.props.item.businessName)
          topRow = (
            <span className={classes.highlight} style={{ fontSize: "18px" }}>
              {this.props.item.businessName}
            </span>
          );
        else
          topRow = (
            <span className={classes.highlight} style={{ fontSize: "18px" }}>
              {this.props.item.firstName} {this.props.item.lastName}
            </span>
          );
        if (this.props.item.jobSet)
          middleRow = (
            <React.Fragment>
              <span style={{ fontSize: "18px" }}>Jobs:</span>
              &nbsp;&nbsp;
              {`${this.props.item.jobSet.edges.length}`}
            </React.Fragment>
          );
        if (this.props.item.noteSet)
          bottomRow = (
            <React.Fragment>
              <span style={{ fontSize: "18px" }}>Notes:</span>
              &nbsp;&nbsp;
              {`${this.props.item.noteSet.edges.length}`}
            </React.Fragment>
          );
        break;
      case "note":
        topRow = (
          <React.Fragment>
            <span style={{ fontSize: "18px" }}>Title:</span>
            &nbsp;&nbsp;
            {`${this.props.item.title}`}
          </React.Fragment>
        );
        if (this.props.item.client) {
          if (this.props.item.client.businessName) {
            middleRow = (
              <React.Fragment>
                <span
                  style={{ fontSize: "18px" }}
                  className={classes.highlight}
                >
                  Client:
                </span>
                &nbsp;&nbsp;
                <span className={classes.highlight}>
                  {this.props.item.client.businessName}
                </span>
              </React.Fragment>
            );
          } else {
            middleRow = (
              <React.Fragment>
                <span
                  style={{ fontSize: "18px" }}
                  className={classes.highlight}
                >
                  Client:&nbsp;&nbsp;
                </span>{" "}
                <span className={classes.highlight}>
                  {this.props.item.client.firstName}{" "}
                  {this.props.item.client.lastName}
                </span>
              </React.Fragment>
            );
          }
        } else if (this.props.item.job) {
          middleRow = (
            <React.Fragment>
              <span style={{ fontSize: "18px" }} className={classes.highlight}>
                Job:
              </span>{" "}
              &nbsp;&nbsp;
              <span className={classes.highlight}>
                {this.props.item.job.name}
              </span>
            </React.Fragment>
          );
        }
        if (this.props.item.client) {
          if (this.props.item.job) {
            bottomRow = (
              <React.Fragment>
                <span
                  style={{ fontSize: "18px" }}
                  className={classes.highlight}
                >
                  Job:
                </span>{" "}
                &nbsp;&nbsp;
                <span className={classes.highlight}>
                  {this.props.item.job.name}
                </span>
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
          <Typography variant="subheading" noWrap style={{ lineHeight: "2.5" }}>
            {topRow}
          </Typography>
          <Typography variant="subheading" noWrap style={{ lineHeight: "2.5" }}>
            {middleRow}
          </Typography>
          <Typography variant="subheading" noWrap style={{ lineHeight: "2.5" }}>
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

export default withRouter(withStyles(styles)(ItemCard));
