import { gql } from "@apollo/client";

export const GET_ALL_FACILITIES = gql`
  query {
    getAllFacilities {
      id
      name
    }
  }
`;
