import React, { Component } from "react";
import { withRouter } from "react-router";
import TagForm from "./tagform";
import { DETAILED_TAG_BY_ID } from "../../queries";
import { Query } from "react-apollo";

//  This component will render on the /tags/:id/edit route when the user is logged in
//  It is a child of the home component.
//  It presents the user with a prepopulated form to update a tag.

//  https://balsamiq.cloud/sc1hpyg/po5pcja/r1473
class EditTag extends Component {
  render() {
    return (
      <Query
        query={DETAILED_TAG_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <TagForm mode="edit" tag={data.tag} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EditTag);
