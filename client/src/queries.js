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

const QUERY_ALL_NOTES = gql`
  query {
    allNotes {
      edges {
        node {
          id
          title
          content
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
        businessName
        id
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

const DETAILED_CLIENT_BY_ID = gql`
  query($id: ID!) {
    client(id: $id) {
      id
      businessName
      firstName
      lastName
      streetNumber
      unitNumber
      streetName
      city
      state
      zipcode
      jobSet {
        edges {
          node {
            id
            name
            description
          }
        }
      }
      noteSet {
        edges {
          node {
            id
            title
            content
          }
        }
      }
    }
  }
`;

export {
  QUERY_ALL_JOBS,
  QUERY_ALL_NOTES,
  DETAILED_JOB_BY_ID,
  QUERY_ALL_CLIENTS,
  DETAILED_CLIENT_BY_ID
};
