import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client';
import {LOCALSTORAGE_TOKEN_KEY} from './constants';

/**
 * apollo, graphql 상태 변경을 위한 방법 "reactive variables"
 * apollo.ts -> isLoggedInVar 참고
 * 레퍼런스 : https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing
 * */
const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
const isAuthToken = Boolean(token);
export const isLoggedInVar = makeVar(isAuthToken);
export const authToken = makeVar(token);

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
          },
          token     : {
            read() {
              return authToken();
            }
          }
        }
      }
    }
  })
});

export default client;
