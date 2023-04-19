import { gql } from "@apollo/client";

export const GET_USERS = gql`
query {
  users {
    id
    name
    email
    password
  }
}
`;

export const ME = gql`
query {
  me {
    name
  }
}
`;
