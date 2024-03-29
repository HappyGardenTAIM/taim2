import React from 'react';
import { StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import {EXPO_PUBLIC_GRAPHQL_URL} from "@env";
import Taim from './Taim';

const httpLink = new HttpLink({ uri: EXPO_PUBLIC_GRAPHQL_URL });

const logLink = new ApolloLink((operation, forward) => {
  console.log(EXPO_PUBLIC_GRAPHQL_URL);
  console.log(`GraphQL Request: ${operation.operationName}`);
  return forward(operation).map(response => {
    console.log(`GraphQL Response: ${operation.operationName}`, response);
    return response;
  });
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([logLink, httpLink]),
  cache: new InMemoryCache()
});

AppRegistry.registerComponent('TAIM', () => App);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Taim />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});