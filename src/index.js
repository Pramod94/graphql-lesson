import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Helps to pass the data to the entire application
import { ApolloProvider } from "react-apollo";

// 'apollo-link-http' and 'apollo-cache-inmemory' comes once we install 'react-apollo' and 'apollo-boost'

// Helps to connect to main endpoint
import { createHttpLink } from "apollo-link-http";

// Helps to cache the data it fetches from server
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloClient, gql } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

// Just testing, whether we are able to access the GraphQl data
client
  .query({
    query: gql`
      {
        collections {
          id
          title
        }
      }
    `,
  })
  .then((res) => console.log("Testing GraphQl data---using gql-----", res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
