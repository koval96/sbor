import { gql } from "@apollo/client";

export const GET_ALL_NEWS = gql`
  query {
    getAllNews {
      id
      title
      text
      user {
        lastName
        firstName
      }
    }
  }
`;
