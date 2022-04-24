import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation (
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!,
    $email: String!,
    $age: Int!,
    $education: String!,
    $tg: String!,
    $phone: String!
  ) {
    register(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName,
      email: $email,
      age: $age,
      education: $education,
      tg: $tg,
      phone: $phone
    ) {
      ok
    }
  }
`;
