import React from 'react';

export default function Login() {
  return (
    <div className={'h-screen flex items-center justify-center bg-gray-800'}>
      <div className={'bg-white px-10 w-full max-w-lg py-10 rounded-md text-center'}>
        <h3 className={'text-2xl text-gray-800'}>Login</h3>
        <form className={'flex flex-col p-5'}>
          <input type="text" className={'login-input transition300 mb-5'} placeholder="Email"/>
          <input type="text" className={'login-input transition300'} placeholder="Password"/>
          <button className={'blue-button transition300 mt-5 p-3'}>LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
