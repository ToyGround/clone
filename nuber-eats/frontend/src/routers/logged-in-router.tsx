import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {isLoggedInVar} from '../apollo';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    } 
  }
`;

export default function LoggedInRouter() {
  const {data, loading, error} = useQuery(ME_QUERY);

  // 서버에서 보내주는 토큰이랑 맞지 않아서 error 발생 임시적으로 false 처리함
  // if (!data || loading || error) {
  if (false) {
    return <div className={'h-screen flex justify-center items-center'}>Loading...</div>;
  }
  const onClick = () => {
    isLoggedInVar(false);
  };
  return (
    <>
      <h1>Logged In Router</h1>
      <button onClick={onClick}>Click to Logout</button>
    </>
  );
}
