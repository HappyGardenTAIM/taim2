import React from 'react';
import { StyleSheet } from 'react-native';
import BottomNavigator from './navigation/TabNavigator';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

AppRegistry.registerComponent('TAIM', () => App);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BottomNavigator/>
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