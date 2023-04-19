const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

// Define the MongoDB database model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

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
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
  }
`;

// define GraphQL resolver
const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    registerUser: async (_ , { name, email, password } ) => {
      const user = new User({
        name,
        email,
        password,
      });
      await user.save();
      return user;
    },
  },
};

// connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

// Initialize the Express application
const app = express();

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start Apollo Server and apply it to the Express application
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// start the server
startServer().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
