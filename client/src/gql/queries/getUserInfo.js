import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query ($username: String!) {
    getUserInfo(username: $username) {
      id
      username
      firstName
      lastName
      type
      isStaff
      operations {
        id
        name
        age
        description
        searchStart
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
  }
`;
