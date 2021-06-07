import React from 'react';
import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import FormError from '../components/FormError';
import Button from '../components/Button';
import { Helmet } from 'react-helmet-async';
import {UserRole} from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput:CreateAccountInput!) {
    createAccount(input : $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role :UserRole
}

export default function Signup() {
  const {register, getValues,watch, handleSubmit, formState: {errors, isValid}} = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues : {
      role : UserRole.Client
    }
  });

  const [crateAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);

  const onSubmit = () => {};

  console.log(watch())

  return (
    <div className={'h-screen flex items-center justify-center bg-gray-800'}>
      <Helmet><title>Create Account | nuber eats</title></Helmet>
      <div className={'bg-white px-10 w-full max-w-lg py-10 rounded-md text-center'}>
        <h3 className={'text-2xl text-gray-800'}>Signup</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={'grid gap-3 p-5'}>
          <input {...register('email', {required: '이메일을 입력해주세요.', pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:'이메일 형식으로 입력해주세요.'}})}
                 name="email"
                 type="email"
                 required
                 className={'login-input transition300 mb-5'}
                 placeholder="Email"/>
          {errors.email?.message && <FormError errorMessage={errors.email.message}/>}
          <input {...register('password', {required: '비밀번호를 입력해주세요.', minLength: 8})}
                 name="password"
                 type="password"
                 required
                 className={'login-input transition300'}
                 placeholder="Password"/>
          {errors.password?.message && <FormError errorMessage={errors.password.message}/>}
          {errors.password?.type === 'minLength' && <FormError errorMessage={'비밀번호는 8자 이상입니다.'}/>}
          <select {...register('role',{required:true})}  className={'account-select'}>
            {Object.keys(UserRole).map((role) => <option key={role}>{role}</option>)}
          </select>
          <Button isClickOn={isValid} loading={false} actionText={'CREATE ACCOUNT'}/>
        </form>
        <p>이미 회원이신가요? <Link to={'/login'} className={'text-blue-400 hover:underline'}>로그인 바로가기</Link></p>
      </div>
    </div>
  );
}
