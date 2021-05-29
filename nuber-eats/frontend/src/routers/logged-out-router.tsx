import React from 'react';
import {isLoggedInVar} from '../apollo';

export default function LoggedOutRouter() {

  /**
   * apollo, graphql 상태 변경을 위한 방법 "reactive variables"
   * apollo.ts -> isLoggedInVar 참고
   * 레퍼런스 : https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing
   * */
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <>
      <h1>LoggedOutRouter</h1>
      <button onClick={onClick}>Click to Login</button>
    </>
  );
}
