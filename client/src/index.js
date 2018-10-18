import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
import { createBrowserHistory } from "history";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_ENDPOINT,
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
