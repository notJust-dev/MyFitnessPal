import { Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://oneonta.stepzen.net/api/belligerent-waterbuffalo/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey oneonta::stepzen.io+1000::f1fd564cbba026853eeedfbb05322edfe26263d2973848915d962dd16878e937',
  },
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;
