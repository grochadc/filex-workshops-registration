import * as React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";

/*
const ServerUri =
  process.env.NODE_ENV === "production"
    ? "https://filex-database.herokuapp.com/"
    : "http://localhost:5000/";
    */

const clientEnviroment =
  process.env.NODE_ENV === "development" ? "dev" : "prod";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://filex-database.herokuapp.com/",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "client-enviroment": clientEnviroment,
  },
  //@ts-ignore
  connectToDevtools: true,
});

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  rootElement
);
