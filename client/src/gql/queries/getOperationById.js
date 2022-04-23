import { gql } from "@apollo/client";

export const GET_OPERATION_BY_ID = gql`
  query ($id: ID!) {
    getOperationById(id: $id) {
      id
      status
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
        user {
          id
          firstName
          lastName
          type
        }
        status
      }
      facility {
        name
      }
      plan
      coords
    }
  }
`;