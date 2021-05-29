import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies : {
      Query : {
        fields : {
          isLoggedIn : {
            read() {
              // return Boolean(localStorage.getItem('token'))
              return false
            }
          }
        }
      }
    }
  })
});

export default client
