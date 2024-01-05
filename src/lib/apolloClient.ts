import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://graphql.anilist.co/',
    }),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();
