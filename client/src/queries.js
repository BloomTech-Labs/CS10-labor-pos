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

const QUERY_ALL_TAGS = gql`
  query {
    allTags {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

const QUERY_ALL_PARTS = gql`
  query {
    allParts {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

const ALL_CLIENTS_AND_JOBS = gql`
  query {
    allJobs {
      edges {
        node {
          name
          id
        }
      }
    }
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
  query client($id: ID!) {
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
            title
            content
            created_at
            modified_at
          }
        }
      }
    }
  }
`;

const DETAILED_NOTE_BY_ID = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      title
      content
      createdAt
      modifiedAt
      tagSet {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    }
  }
`;

export {
  QUERY_ALL_JOBS,
  QUERY_ALL_NOTES,
  QUERY_ALL_TAGS,
  DETAILED_JOB_BY_ID,
  QUERY_ALL_CLIENTS,
  DETAILED_CLIENT_BY_ID,
  QUERY_ALL_PARTS,
  ALL_CLIENTS_AND_JOBS,
  DETAILED_NOTE_BY_ID
};
