import React from 'react';
import {isLoggedInVar} from '../apollo';

export default function LoggedInRouter() {
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
