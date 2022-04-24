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
      appearance
      adress
      imageUrl
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
        facilities {
          id
          name
        }
      }
      facility {
        name
      }
      plan
      coords
    }
  }
`;
