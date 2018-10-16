import React, { Component } from "react";
import { withRouter } from "react-router";
import NavigateNext from "@material-ui/icons/NavigateNext.js";
import NavigateBefore from "@material-ui/icons/NavigateBefore.js";
import AddCircle from "@material-ui/icons/AddCircle.js";
import {
  Grid,
  Card,
  IconButton,
  Typography,
  withStyles
} from "@material-ui/core";
import { ItemCard } from "../../components";
import { styles } from "../material-ui/styles.js";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

//  This component shows a list of cards representing one of our item types.
//  It renders as a child of many components.

//  PROPS:
//    type: The item type to be displayed.
//    rows: The number of rows to be shown.
//    columns: The number of columns to be shown.  Takes 3, 4, or 6.
//    items: An array of items to be listed.
//    createMethod: the method for creating a new item

class CardList extends Component {
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

  componentDidMount = () => {
    this.props.refetch();
  };

  render() {
    let { classes } = this.props;

    let card_array = [];
    let columns = 1;
    let per_page = this.props.rows * this.props.columns;
    if (isWidthUp("sm", this.props.width)) {
      columns = 2;
    }
    if (isWidthUp("md", this.props.width)) {
      columns = this.props.columns;
    }

    for (
      let i = this.state.page * per_page;
      i < this.props.items.length && i < (this.state.page + 1) * per_page;
      i++
    ) {
      card_array.push(
        <Grid item xs={12 / columns} key={i}>
          <Card raised className={classes.item_card}>
            <ItemCard
              after_path={this.props.after_path}
              type={this.props.type}
              item={this.props.items[i].node}
              refetch={this.props.refetch}
            />
          </Card>
        </Grid>
      );
    }
    if (this.props.location.pathname !== "/jobs")
      card_array.push(
        <Grid item xs={12 / columns} key={-1}>
          <Card raised className={classes.new_card}>
            <br />
            <IconButton onClick={this.props.createMethod}>
              <AddCircle />
            </IconButton>
            <Typography
              className={classes.typography_card}
              variant="subheading"
            >{`New ${this.props.type}`}</Typography>
          </Card>
        </Grid>
      );
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={24}
        >
          {card_array}
        </Grid>
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
            (this.state.page + 1) * per_page > this.props.items.length - 1
          }
        >
          <NavigateNext />
        </IconButton>
      </div>
    );
  }
}

export default withRouter(withWidth()(withStyles(styles)(CardList)));
