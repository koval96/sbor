import { gql } from "@apollo/client";

export const CREATE_OPERATION = gql`
  mutation (
    $name: String!
    $age: Int!
    $imageUrl: String!
    $description: String!
    $adress: String!
    $appearance: String!
    $username: String!
    $plan: String!
    $coords: String!
    $searchStart: String!
  ) {
    createOperation(
      name: $name
      age: $age
      imageUrl: $imageUrl
      description: $description
      adress: $adress
      appearance: $appearance
      username: $username
      plan: $plan
      coords: $coords
      searchStart: $searchStart
    ) {
      id
    }
  }
`;
