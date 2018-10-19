import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grid, Card, withStyles } from "@material-ui/core";
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

  componentDidMount = () => {
    this.props.refetch();
  };

  render() {
    let { classes } = this.props;
    let user_premium = localStorage.getItem("USER_PREMIUM");
    if (user_premium === "true") user_premium = true;
    else user_premium = false;
    let card_array = [];
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

export default withRouter(withWidth()(withStyles(styles)(CardList)));
