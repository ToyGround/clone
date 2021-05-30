import React from 'react';

interface IButtonProps {
  isClickOn: boolean;
  loading: boolean;
  actionText: string;
}

export default function Button({isClickOn, loading, actionText}: IButtonProps) {
  return <button className={'blue-button transition300 mt-5 p-3'}
                 disabled={isClickOn ? false : true}>{loading ? 'loading...' : actionText}</button>;
}
