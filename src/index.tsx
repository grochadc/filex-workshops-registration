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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://filex-database.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
