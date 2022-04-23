import { gql } from "@apollo/client";

export const JOIN_EVENT = gql`
  mutation ($username: String!, $id: ID!) {
    joinEvent(username: $username, id: $id) {
      event {
        id
        type
        description
        dateStart
        head {
          lastName
          firstName
        }
      }
    }
  }
`;
