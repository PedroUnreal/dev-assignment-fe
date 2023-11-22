import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";
import { API_URL, API_KEY } from "./environment";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  uri: API_URL,
  headers: {
    apiKey: API_KEY,
  },
});
