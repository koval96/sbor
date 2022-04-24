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
          status
          imageUrl
          id
          name
          age
          description
          searchStart
          adress
          volunteers {
            id
          }
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
