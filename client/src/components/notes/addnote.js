import React, { Component } from "react";
import { withRouter } from "react-router";
// import gql from "graphql-tag";

// Mutation to create note
// const CREATE_NOTE = gql`
//   mutation createNote(
//     $client: ID!
//     $job: ID
//     $title: String!
//     $content: String!
//   ) {
//     createNote(client: $client, job: $job, title: $title, content: $content) {
//       note {
//         id
//       }
//     }
//   }
// `;

//This component will render as a child of home on the
// /notes/create route when the user is logged in.
//It presents the user with form fields to create a new note.

//https://balsamiq.cloud/sc1hpyg/po5pcja/r5720
class AddNote extends Component {
  render() {
    return (
      <div>
        <p>ADDNOTE PLACEHOLDER</p>
      </div>
    );
  }
}

export default withRouter(AddNote);
