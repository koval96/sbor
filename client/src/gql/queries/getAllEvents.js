import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query {
    getAllEvents {
      id
      title
      description
      dateStart
      type
      head {
        id
        username
        firstName
        lastName
      }
    }
  }
`;
