import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client';

/**
 * apollo, graphql 상태 변경을 위한 방법 "reactive variables"
 * apollo.ts -> isLoggedInVar 참고
 * 레퍼런스 : https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing
 * */
export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri  : 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              // return Boolean(localStorage.getItem('token'))
              return isLoggedInVar();
            }
          }
        }
      }
    }
  })
});

export default client;
