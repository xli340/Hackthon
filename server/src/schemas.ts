import { gql } from "apollo-server-express";

// define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    me: User
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
    login(name: String!, password: String!): User!
    logout: Boolean
  }
`;

export default typeDefs;