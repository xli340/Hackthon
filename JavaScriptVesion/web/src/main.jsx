import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// use ApollotClient to connect with Backend
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
