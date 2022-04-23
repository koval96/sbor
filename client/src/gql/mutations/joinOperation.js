import { gql } from "@apollo/client";

export const JOIN_OPERATION = gql`
  mutation ($username: String!, $id: ID!) {
    joinOperation(username: $username, id: $id) {
      operation {
        id
        name
        status
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
        plan
        coords
      }
    }
  }
`;
