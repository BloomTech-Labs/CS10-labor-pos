import React, { Component } from "react";
import { withRouter } from "react-router";
import NavigateNext from "@material-ui/icons/NavigateNext.js";
import NavigateBefore from "@material-ui/icons/NavigateBefore.js";
import Delete from "@material-ui/icons/Delete.js";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  withStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { styles } from "../material-ui/styles.js";
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
      page: 0,
      deleting: false,
      delete_item: null
    };
  }

  handlePageBack = event => {
    event.preventDefault();
    this.setState({
      page: this.state.page - 1
    });
  };

  handlePageForward = event => {
    event.preventDefault();
    this.setState({
      page: this.state.page + 1
    });
  };

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
    let list_items = [];
    for (
      let i = this.props.per_page * this.state.page;
      i < this.props.per_page * (this.state.page + 1) &&
      i < this.props.items.length;
      i++
    ) {
      let current_item = this.props.items[i].node;
      let item_class = classes.list_item_reg;
      if (i % 2) item_class = classes.list_item_light;
      list_items.push(
        <ListItem key={i} dense button className={item_class}>
          <Link to={`${path}/${current_item.id}`}>
            <ListItemText>{current_item[name_field]}</ListItemText>
          </Link>
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
    return (
      <div>
        <Paper>
          <List>{list_items}</List>
        </Paper>
        <IconButton
          onClick={this.handlePageBack}
          disabled={this.state.page === 0}
        >
          <NavigateBefore />
        </IconButton>
        {this.state.page + 1}
        <IconButton
          onClick={this.handlePageForward}
          disabled={
            (this.state.page + 1) * this.props.per_page >
            this.props.items.length - 1
          }
        >
          <NavigateNext />
        </IconButton>
        <Dialog
          open={this.state.deleting}
          onClose={this.cancelDelete}
          className="delete-modal"
        >
          <DeleteItem
            cancelDelete={this.cancelDelete}
            type={this.props.type}
            item={this.state.delete_item}
            after_path={this.props.match.url}
          />
        </Dialog>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ItemList));
