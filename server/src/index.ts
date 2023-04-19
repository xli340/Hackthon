import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import session from "express-session";
import Redis from "ioredis";
import connectRdis from "connect-redis";

// Initialize the Express application
const app = express();
app.set("trust proxy", 1);

// set redis
const RedisStore = connectRdis(session);
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
