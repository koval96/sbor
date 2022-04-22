import { gql } from "@apollo/client";

export const GET_ALL_OPERATIONS = gql`
  query {
    getAllOperations {
      id
      name
      age
      description
      searchStart
      adress
      head {
        id
        firstName
        lastName
        type
      }
      volunteers {
        id
        firstName
        lastName
        type
      }
      facility {
        name
      }
    }
  }
`;
