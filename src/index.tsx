import * as React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const ServerUri =
  process.env.NODE_ENV === "production"
    ? "https://filex-database.herokuapp.com/graphql"
    : "http://localhost:5000/";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: ServerUri,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
