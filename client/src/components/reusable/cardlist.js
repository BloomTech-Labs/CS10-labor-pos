import React, { Component } from "react";
import { withRouter } from "react-router";
import { Grid, Card, withStyles, Button, Typography } from "@material-ui/core";
import { ItemCard } from "../../components";
import { styles } from "../material-ui/styles.js";
import withWidth from "@material-ui/core/withWidth";
import AddCircle from "@material-ui/icons/AddCircle.js";

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
    if (
      this.props.location.pathname === "/clients" ||
      this.props.location.pathname === "/notes"
    ) {
      if (!user_premium && this.props.items.length < 6) {
        return (
          <React.Fragment>
            <Grid item xs={12}>
              <Button
                onClick={this.props.createMethod}
                className={classes.add_button}
                variant="contained"
              >
                <AddCircle />
                <Typography>{`New ${this.props.type}`}</Typography>
              </Button>
            </Grid>
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
          </React.Fragment>
        );
      } else if (user_premium) {
        return (
          <React.Fragment>
            <Grid item xs={1} md={2}>
              <Button
                onClick={this.props.createMethod}
                className={classes.add_button}
                variant="contained"
                style={{ marginTop: "-20px", padding: "8px 30px" }}
              >
                <AddCircle />
                &nbsp;&nbsp;
                <Typography className={classes.add_text}>{`New ${
                  this.props.type
                }`}</Typography>
              </Button>
            </Grid>
            <Grid item xs={11} md={10} />
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
          </React.Fragment>
        );
      }
    }
    return (
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
    );
  }
}

export default withRouter(withWidth()(withStyles(styles)(CardList)));
