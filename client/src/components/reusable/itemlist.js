import React, { Component } from "react";
import { withRouter } from "react-router";
import Delete from "@material-ui/icons/Delete.js";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  Typography,
  withStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
import Loadable from "react-loadable";

export class NavLinkMui extends Component {
  render() {
    const { forwardRef, ...props} = this.props;
    return <Link {...props} ref={forwardRef}/>
  }
}

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

//  This component shows a small, paginated list of items with add and delete options
//  It renders as a child of individual view components to show related items to
//  those components

//  PROPS:
//    type: the type of the objects to be displayed
//    items: the array of objects to be displayed in the list
//    per_page: the number of list items to display per page

// Space-efficient list kind of like cardlist but smaller

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      deleting: false,
      delete_item: null
    };
  }

  handleDeleteButton = item => event => {
    event.preventDefault();
    this.setState({ delete_item: item }, () => {
      this.setState({ deleting: true });
    });
  };

  cancelDelete = () => {
    this.setState({ deleting: false });
  };

  render() {
    const { classes } = this.props;
    let name_field = "";
    let path = "";
    switch (this.props.type) {
      case "job":
        name_field = "name";
        path = "/jobs";
        break;
      case "part":
        name_field = "name";
        path = "/parts";
        break;
      case "note":
        name_field = "title";
        path = "/notes";
        break;
      default:
        name_field = "first_name last_name";
        path = "/clients";
        break;
    }
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    let list_items = [];
    if (user_premium) {
      for (let i = 0; i < this.props.items.length; i++) {
        let current_item = this.props.items[i].node;
        let item_class = classes.list_item_reg;
        if (i % 2) item_class = classes.list_item_light;
        list_items.push(
          <ListItem key={i + path} dense button className={item_class} component={NavLinkMui} to={{pathname:`${path}/${current_item.id}`, state: { after_path: this.props.after_path}}}>
              <ListItemText>{current_item[name_field]}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={this.handleDeleteButton(current_item)}
                aria-label="Delete"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
    } else {
      // Passing along the after_path on the link is important for items that don't link directly from their parent
      // This includes /parts which stem from /job/:id and then go to /parts/:partId
      for (let i = 0; i < this.props.items.length && i < 6; i++) {
        let current_item = this.props.items[i].node;
        let item_class = classes.list_item_reg;
        if (i % 2) item_class = classes.list_item_light;
        list_items.push(
          <ListItem key={i + path} dense button className={item_class} component={NavLinkMui} to={{pathname:`${path}/${current_item.id}`, state: { after_path: this.props.after_path}}}>
              <ListItemText>{current_item[name_field]}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={this.handleDeleteButton(current_item)}
                aria-label="Delete"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
    }
    return (
      <div>
        <Paper>
          <List>{list_items}</List>
        </Paper>

        <Dialog
          open={this.state.deleting}
          onClose={this.cancelDelete}
          className="delete-modal"
        >
          <DeleteItem
            cancelDelete={this.cancelDelete}
            type={this.props.type}
            item={this.state.delete_item}
            refetch={this.props.refetch}
          />
        </Dialog>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ItemList));
