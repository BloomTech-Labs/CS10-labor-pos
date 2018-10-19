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
  withStyles,
  Button
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
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    let card_array = [];
    let columns = 1;
    if (isWidthUp("sm", this.props.width)) {
      columns = 2;
    }
    if (isWidthUp("md", this.props.width)) {
      columns = this.props.columns;
    }
    if (user_premium) {
      for (let i = 0; i < this.props.items.length; i++) {
        card_array.push(
          <Grid item xs={12} md={6} lg={4} key={i}>
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
    } else {
      for (let i = 0; i < this.props.items.length && i < 6; i++) {
        card_array.push(
          <Grid item xs={12} md={6} lg={4} key={i}>
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
    }
    if (this.props.location.pathname != "/jobs") {
      if (user_premium) {
        return (
          <div>
            <Button
              onClick={this.props.createMethod}
              className={classes.add_button}
            >
              <Typography>{`New ${this.props.type}`}</Typography>
            </Button>
            <br />
            <br />
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
            <br />
            <br />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              spacing={24}
            />
          </div>
        );
      } else {
        if (this.props.items.length < 6) {
          return (
            <div>
              <Button
                onClick={this.props.createMethod}
                className={classes.add_button}
              >
                <Typography>{`New ${this.props.type}`}</Typography>
              </Button>
              <br />
              <br />
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
              <br />
              <br />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={24}
              />
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <br />
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
              <br />
              <br />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                spacing={24}
              />
            </div>
          );
        }
      }
    }
  }
}

export default withRouter(withWidth()(withStyles(styles)(CardList)));
