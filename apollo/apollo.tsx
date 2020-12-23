import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createApolloClient(initialState?): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: "https://snelsi-pis.hasura.app/v1/graphql",
    credentials: "same-origin",
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret": process.env.HASURA_SEVRET,
      },
    };
  });

  return new ApolloClient({
    // @ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  });
}

const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};

/**
 * Creates and provides the apolloContext.
 * Use it by wrapping your PageComponent via HOC pattern.
 */
export const Apollo: React.FC = ({ children }) => {
  const client = initApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
