import { gql } from "@apollo/client";

export const CHANGE_FACILITY = gql`
  mutation ($idVol: ID!, $idFac: ID!) {
    changeFacility(idVol: $idVol, idFac: $idFac) {
      volunteers {
        id
        user {
          id
          firstName
          lastName
          type
        }
        status
        facilities {
          id
          name
        }
      }
    }
  }
`;
