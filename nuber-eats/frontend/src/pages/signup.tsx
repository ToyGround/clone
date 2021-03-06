import React from 'react';
import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import FormError from '../components/FormError';
import Button from '../components/Button';
import {Helmet} from 'react-helmet-async';
import {UserRole} from '../__generated__/globalTypes';
import {createAccountMutation, createAccountMutationVariables} from '../__generated__/createAccountMutation';

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
  role: UserRole
}

export default function Signup() {
  const {register, getValues, handleSubmit, formState: {errors, isValid}} = useForm<ICreateAccountForm>({
    mode         : 'onChange',
    defaultValues: {
      role: UserRole.Client
    }
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {createAccount: {ok}} = data;
    if (ok) {
      history.push('/login');
    }
  };
  const [crateAccountMutation, {loading, data: createAccountMutationResult}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {onCompleted});

  const onSubmit = () => {
    if (!loading) {
      const {email, password, role} = getValues();
      crateAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role
          }
        }
      });
    }
  };

  return (
    <div className={'h-screen flex items-center justify-center bg-gray-800'}>
      <Helmet><title>Create Account | nuber eats</title></Helmet>
      <div className={'bg-white px-10 w-full max-w-lg py-10 rounded-md text-center'}>
        <h3 className={'text-2xl text-gray-800'}>Signup</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={'grid gap-3 p-5'}>
          <input {...register('email', {
            required: '???????????? ??????????????????.',
            pattern : {
              value  : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '????????? ???????????? ??????????????????.'
            }
          })}
                 name="email"
                 type="email"
                 required
                 className={'login-input transition300 mb-5'}
                 placeholder="Email"/>
          {errors.email?.message && <FormError errorMessage={errors.email.message}/>}
          <input {...register('password', {
            required : '??????????????? ??????????????????.',
            minLength: 8
          })}
                 name="password"
                 type="password"
                 required
                 className={'login-input transition300'}
                 placeholder="Password"/>
          {errors.password?.message && <FormError errorMessage={errors.password.message}/>}
          {errors.password?.type === 'minLength' && <FormError errorMessage={'??????????????? 8??? ???????????????.'}/>}
          <select {...register('role', {required: true})} className={'account-select'}>
            {Object.keys(UserRole).map((role) => <option key={role}>{role}</option>)}
          </select>
          {createAccountMutationResult?.createAccount.error &&
          <FormError errorMessage={createAccountMutationResult.createAccount.error}/>}
          <Button isClickOn={isValid} loading={loading} actionText={'CREATE ACCOUNT'}/>
        </form>
        <p>?????? ??????????????????? <Link to={'/login'} className={'text-blue-400 hover:underline'}>????????? ????????????</Link></p>
      </div>
    </div>
  );
}
