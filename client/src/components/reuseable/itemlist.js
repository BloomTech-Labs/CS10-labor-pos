import React, { Component } from "react";
import { withRouter } from "react-router";
import { Delete, NavigateNext, NavigateBefore } from "@material-ui/icons";
import {
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";

//  This component shows a small, paginated list of items with add and delete options
//  It renders as a child of individual view components to show related items to
//  those components

//  PROPS:
//    type: the type of the objects to be displayed
//    items: the array of objects to be displayed in the list
//    per_page: the number of list items to display per page

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      deleting: false
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

  handleDeleteButton = event => {
    event.stopPropagation();
    this.setState({ deleting: true });
  };

  render() {
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
      case "tag":
        name_field = "name";
        path = "/tags";
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
      list_items.push(
        <ListItem key={i} dense button>
          <Link to={`${path}/${current_item.id}`}>
            <ListItemText>{current_item[name_field]}</ListItemText>
          </Link>
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
    return (
      <div>
        <Button className="list-button">Add a new {this.props.type}</Button>
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
            this.props.items.length
          }
        >
          <NavigateNext />
        </IconButton>
      </div>
    );
  }
}

export default withRouter(ItemList);
