import gql from "graphql-tag";

const CREATE_JOB = gql`
  mutation createJob(
    $client: ID!
    $name: String!
    $labor: Float
    $description: String!
    $deadline: Date
    $complete: Boolean
  ) {
    createJob(
      client: $client
      name: $name
      labor: $labor
      description: $description
      deadline: $deadline
      complete: $complete
    ) {
      job {
        name
      }
    }
  }
`;

const UPDATE_JOB = gql`
  mutation updateJob(
    $id: ID!
    $name: String
    $labor: Float
    $description: String
    $deadline: Date
    $complete: Boolean
  ) {
    updateJob(
      id: $id
      name: $name
      labor: $labor
      description: $description
      deadline: $deadline
      complete: $complete
    ) {
      job {
        name
        id
      }
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $email: String!
    $businessName: String!
    $city: String!
    $firstName: String!
    $lastName: String!
    $state: String!
    $streetAddress: String!
    $zipcode: String!
  ) {
    createUser(
      username: $username
      password: $password
      email: $email
      businessName: $businessName
      city: $city
      firstName: $firstName
      lastName: $lastName
      state: $state
      streetAddress: $streetAddress
      zipcode: $zipcode
    ) {
      user {
        id
      }
    }
  }
`;

const DELETE_JOB = gql`
  mutation($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;

const DELETE_NOTE = gql`
  mutation($id: ID!) {
    deleteNote(id: $id) {
      ok
    }
  }
`;

const DELETE_TAG = gql`
  mutation($id: ID!) {
    deleteTag(id: $id) {
      ok
    }
  }
`;

const DELETE_PART = gql`
  mutation($id: ID!) {
    deletePart(id: $id) {
      ok
    }
  }
`;

export {
  CREATE_JOB,
  UPDATE_JOB,
  SIGNIN_MUTATION,
  CREATE_USER,
  DELETE_JOB,
  DELETE_NOTE,
  DELETE_PART,
  DELETE_TAG
};
