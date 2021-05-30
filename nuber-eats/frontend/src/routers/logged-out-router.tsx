import React from 'react';
import {isLoggedInVar} from '../apollo';
import {useForm} from 'react-hook-form';

export default function LoggedOutRouter() {
  /**
   * [react-hook-form]
   * watch : register 로 등록된 부분을 감지한다.
   * handleSubmit : handleSubmit 이용하여 onSubmit 함수를 넣어준다. (e.preventDefault()를 안해도 된다.)
   * */
  const {register, watch, handleSubmit} = useForm();
  const onSubmit = () => {
    console.log(watch('email'));
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div><input {...register('email', {required: true})} type="email" name="email" placeholder="email"/></div>
        <div><input {...register('password', {required: true})} type="password" name="password" placeholder="password"/>
        </div>
        <button className={'bg-blue-500 text-white'}>Click to Login</button>
      </form>
    </>
  );
}
