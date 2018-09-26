import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import { Grid, Card, IconButton } from "@material-ui/core";

//  This component shows a list of cards representing one of our item types.
//  It renders as a child of many components.

//  PROPS:
//    CardComponent: The component that will render individual cards.
//    rows: The number of rows to be shown.
//    columns: The number of columns to be shown.  Takes 3, 4, or 6.
//    items: An array of items to be listed.

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

  render() {
    let ItemCard = this.props.CardComponent;
    let per_page = this.props.rows * this.props.columns;
    let card_array = [];
    for (
      let i = this.state.page * per_page;
      i < this.props.items.length && i < (this.state.page + 1) * per_page;
      i++
    ) {
      card_array.push(
        <Grid item xs={12 / this.props.columns} key={i}>
          <Card>
            <ItemCard job={this.props.items[i].node} />
          </Card>
        </Grid>
      );
    }
    return (
      <div>
        {/*This is using a material ui grid; it works the same as bootstrap columns with the numbers out of 12*/}
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
          {card_array}
        </Grid>
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

export default withRouter(CardList);
