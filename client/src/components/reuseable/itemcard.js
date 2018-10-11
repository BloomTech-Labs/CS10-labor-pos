import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Create, Delete } from "@material-ui/icons";
import {
  IconButton,
  Typography,
  Dialog,
  withStyles,
  Grid
} from "@material-ui/core";
import { DeleteItem } from "..";
import { styles } from "../material-ui/styles.js";

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
    let path = "";
    let name = "";
    switch (this.props.type) {
      case "job":
        path = "/jobs";
        name = this.props.item.name;
        break;
      case "client":
        path = "/clients";
        if (this.props.item.businessName) name = this.props.item.businessName;
        else name = `${this.props.item.firstName} ${this.props.item.lastName}`;
        break;
      case "note":
        path = "/notes";
        name = this.props.item.title;
        break;
      case "part":
        path = "/parts";
        name = this.props.item.name;
        break;
      default:
        break;
    }
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Link to={`${path}/${this.props.item.id}/edit`}>
              <IconButton>
                <Create />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <IconButton onClick={this.handleDeleteButton}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>

        <Link to={`${path}/${this.props.item.id}`}>
          <Typography
            className={classes.card_title}
            variant="subheading"
            noWrap
          >
            {name}
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
            after_path={this.props.after_path}
          />
        </Dialog>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ItemCard));
