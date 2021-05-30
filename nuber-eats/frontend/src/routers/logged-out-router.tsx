import React from 'react';
import {isLoggedInVar} from '../apollo';
import {useForm} from 'react-hook-form';

export default function LoggedOutRouter() {
  /**
   * [react-hook-form]
   * watch : register 로 등록된 부분을 감지한다.
   * handleSubmit : handleSubmit 이용하여 onSubmit 함수를 넣어준다. (e.preventDefault()를 안해도 된다.)
   * handleSubmit : 첫번째 인자는 submit 함수, 두번째 인자는 validation 체크를 해준다.
   * formState : 구조분해할당으로 errors 를 사용할 수 있다.
   * errors : 입력된 영역들을 체크하고 에러가 발생한 곳의 정보를 객체로 담아서 보내준다.
   * */
  const {register, watch, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    // input email 에서 validate를 @gmail 일때만 통과 시켜줌
    console.log('계정을 생성할 수 없습니다.');
    console.log(errors);
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
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {required: '이메일을 입력해주세요..', validate: (email: string) => (email.includes('@gmail'))})}
            type="email"
            name="email"
            placeholder="email"
          />
          {errors.email?.type === 'validate' && 'gmail만 사용 가능합니다.'}
        </div>
        <div>
          <input
            {...register('password', {required: '비밀번호를 입력해주세요.'})}
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button className={'bg-blue-500 text-white'}>Click to Login</button>
      </form>
    </>
  );
}
