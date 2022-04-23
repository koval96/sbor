import { gql } from "@apollo/client";

export const CHANGE_VOLUNTEER_STATUS = gql`
  mutation ($id: ID!, $status: String!) {
    changeVolunteerStatus(id: $id, status: $status) {
      ok
    }
  }
`;
