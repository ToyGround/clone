import React from 'react';
import {useForm} from 'react-hook-form';
import FormError from '../components/FormError';

interface ILoginForm {
  email?: string;
  password?: string
}

export default function Login() {
  const {register, getValues, handleSubmit, formState: {errors}} = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log('submit', getValues());
  };

  return (
    <div className={'h-screen flex items-center justify-center bg-gray-800'}>
      <div className={'bg-white px-10 w-full max-w-lg py-10 rounded-md text-center'}>
        <h3 className={'text-2xl text-gray-800'}>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={'grid gap-3 p-5'}>
          <input {...register('email', {required: '이메일을 입력해주세요.'})}
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
          <button className={'blue-button transition300 mt-5 p-3'}>LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
