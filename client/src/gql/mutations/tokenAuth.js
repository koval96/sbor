import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      user {
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
          type
          title
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
            facility {
              name
            }
          }
        }
      }
    }
  }
`;
