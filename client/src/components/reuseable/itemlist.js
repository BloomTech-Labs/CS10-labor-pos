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

//  This component shows a small, paginated list of items with add and delete options
//  It renders as a child of individual view components to show related items to
//  those components

//  PROPS:
//    name_field: the key in the relevant object to be treated like a name and displayed in the list
//    items: the array of objects to be displayed in the list
//    per_page: the number of list items to display per page
//    thing_listed: the type of item populating the list

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      page: 0
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
  render() {
    let list_items = [];
    for (
      let i = this.props.per_page * this.state.page;
      i < this.props.per_page * (this.state.page + 1) &&
      i < this.props.items.length;
      i++
    ) {
      let current_item = this.props.items[i].node;
      list_items.push(
        <ListItem key={i} dense button role={undefined}>
          <ListItemText>{current_item[this.props.name_field]}</ListItemText>
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
        <Button className="list-button">
          Add a new {this.props.thing_listed}
        </Button>
        <Paper>
          <List>{list_items}</List>
        </Paper>
        <IconButton
          onClick={this.handlePageBack}
          disabled={this.state.page == 0}
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
