import gql from "graphql-tag";

const QUERY_ALL_JOBS = gql`
  query {
    allJobs {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;

const QUERY_ALL_CLIENTS = gql`
  query {
    allClients {
      edges {
        node {
          firstName
          lastName
          businessName
          id
        }
      }
    }
  }
`;

const DETAILED_JOB_BY_ID = gql`
  query job($id: ID!) {
    job(id: $id) {
      client {
        firstName
        lastName
      }
      id
      name
      complete
      labor
      description
      createdAt
      modifiedAt
      deadline
      tagSet {
        edges {
          node {
            name
            id
          }
        }
      }
      noteSet {
        edges {
          node {
            title
            id
          }
        }
      }
      partSet {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

export { QUERY_ALL_JOBS, DETAILED_JOB_BY_ID, QUERY_ALL_CLIENTS };
