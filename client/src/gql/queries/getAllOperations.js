import { gql } from "@apollo/client";

export const GET_ALL_OPERATIONS = gql`
  query {
    getAllOperations {
      id
      status
      name
      age
      description
      searchStart
      adress
      imageUrl
      head {
        id
        firstName
        lastName
        type
      }
      volunteers {
        user {
          id
          firstName
          lastName
          type
        }
      }
      facility {
        name
      }
    }
  }
`;
