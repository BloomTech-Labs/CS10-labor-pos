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
    $businessName: String
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
  mutation createNote(
    $client: ID
    $content: String!
    $job: ID
    $title: String!
  ) {
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
  mutation updateNote($id: ID!, $content: String, $title: String) {
    updateNote(id: $id, content: $content, title: $title) {
      note {
        id
      }
    }
  }
`;

const UPDATE_PART = gql`
  mutation(
    $cost: Float
    $description: String
    $id: ID!
    $job: ID
    $name: String
  ) {
    updatePart(
      cost: $cost
      description: $description
      id: $id
      job: $job
      name: $name
    ) {
      part {
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
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      ok
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      ok
    }
  }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      ok
    }
  }
`;

const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      ok
    }
  }
`;

const DELETE_PART = gql`
  mutation deletePart($id: ID!) {
    deletePart(id: $id) {
      ok
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: ID!
    $businessName: String
    $firstName: String
    $lastName: String
    $email: String
    $streetNumber: String
    $unitNumber: String
    $streetName: String
    $city: String
    $state: String
    $zipcode: String
    $deadline: Date
  ) {
    updateClient(
      id: $id
      businessName: $businessName
      firstName: $firstName
      lastName: $lastName
      email: $email
      streetNumber: $streetNumber
      unitNumber: $unitNumber
      streetName: $streetName
      city: $city
      state: $state
      zipcode: $zipcode
      deadline: $deadline
    ) {
      client {
        id
      }
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

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String
    $password: String
    $email: String
    $firstName: String
    $lastName: String
    $businessName: String
    $streetAddress: String
    $city: String
    $state: String
    $zipcode: String
  ) {
    updateUser(
      id: $id
      username: $username
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
      businessName: $businessName
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipcode: $zipcode
    ) {
      user {
        id
      }
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation createClient(
    $businessName: String
    $firstName: String!
    $lastName: String!
    $email: String!
    $streetNumber: String!
    $unitNumber: String
    $streetName: String!
    $city: String!
    $state: String!
    $zipcode: String!
    $deadline: Date
  ) {
    createClient(
      businessName: $businessName
      firstName: $firstName
      lastName: $lastName
      email: $email
      streetNumber: $streetNumber
      unitNumber: $unitNumber
      streetName: $streetName
      city: $city
      state: $state
      zipcode: $zipcode
      deadline: $deadline
    ) {
      client {
        id
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      status
    }
  }
`;

const CREATE_PART = gql`
  mutation createPart(
    $cost: Float!
    $description: String!
    $name: String!
    $job: ID!
  ) {
    createPart(cost: $cost, name: $name, description: $description, job: $job) {
      part {
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
  UPDATE_CLIENT,
  CREATE_CLIENT,
  CREATE_TAG,
  UPDATE_TAG,
  UPDATE_USER,
  DELETE_USER,
  CREATE_PART,
  UPDATE_PART
};
