import React from 'react';
import { StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import StackNavigator from './navigation/StackNavigators';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.50.102:4000/graphql',
  cache: new InMemoryCache()
});

AppRegistry.registerComponent('TAIM', () => App);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StackNavigator/>
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