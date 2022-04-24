import { gql } from "@apollo/client";

export const CHANGE_OPERATION_STATUS = gql`
  mutation ($id: ID!, $status: String!) {
    changeOperationStatus(id: $id, status: $status) {
      operation {
          id
          status
      }
    }
  }
`;
