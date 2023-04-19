import { gql } from "@apollo/client";
export const REGISTER = gql`
mutation RegisterUser($name: String!, $email: String!, $password: String!) {
  registerUser(name: $name, email: $email, password: $password) {
    id
    name
    email
    password
  }
}
`;

export const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      id
    }
  }
`;