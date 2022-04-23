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
      phone
      tg
      events {
        id
        title
        type
        head {
          firstName
          lastName
        }
        dateStart
        description
      }
      operations {
        operation {
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
        }
      }
    }
  }
`;
