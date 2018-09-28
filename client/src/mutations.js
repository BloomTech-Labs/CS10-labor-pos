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

const CREATE_NOTE = gql`
  mutation($client: ID, $content: String!, $job: ID, $title: String!) {
    createNote(client: $client, content: $content, job: $job, title: $title) {
      note {
        id
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

const UPDATE_NOTE = gql`
  mutation($id: ID!, $content: String, $title: String) {
    updateNote(id: $id, content: $content, title: $title) {
      note {
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

const DELETE_JOB = gql`
  mutation($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation($id: ID!) {
    deleteClient(id: $id) {
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

const CREATE_TAG = gql`
  mutation createTag(
    $job: ID
    $note: ID
    $part: ID
    $name: String!
    $description: String
  ) {
    createTag(
      job: $job
      note: $note
      part: $part
      name: $name
      description: $description
    ) {
      tag {
        id
      }
    }
  }
`;

const UPDATE_TAG = gql`
  mutation updateTag(
    $id: ID!
    $job: ID
    $note: ID
    $part: ID
    $name: String
    $description: String
  ) {
    updateTag(
      id: $ID
      job: $job
      note: $note
      part: $part
      name: $name
      description: $description
    ) {
      tag {
        id
      }
    }
  }
`;

export {
  CREATE_JOB,
  UPDATE_JOB,
  SIGNIN_MUTATION,
  CREATE_USER,
  DELETE_JOB,
  DELETE_CLIENT,
  DELETE_NOTE,
  DELETE_PART,
  DELETE_TAG,
  CREATE_NOTE,
  UPDATE_NOTE,
  CREATE_TAG,
  UPDATE_TAG
};
