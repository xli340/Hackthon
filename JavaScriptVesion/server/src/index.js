const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const session = require('express-session');
const Redis = require('ioredis');
const connectRedis = require('connect-redis');

// Initialize the Express application
const app = express();
app.set("trust proxy", 1);

// set redis
const RedisStore = connectRedis(session);
const redis = new Redis();

// Set up session middleware
app.use(
  session({
    name: "qid", // cookie name
    store: new RedisStore({
      client: redis,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false,
      sameSite: "none",
      secure: true,
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

// Start Apollo Server and apply it to the Express application
async function startServer() {
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      // origin: ["https://studio.apollographql.com"],
      // origin: ["http://localhost:5173"],
      origin: ["http://localhost:5173","https://studio.apollographql.com"],
      // origin: ["*"],
      credentials: true,
    },
  });
}

// start the server
startServer().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});