import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';

import AuthForm from '@/components/common/form/AuthForm';

export interface SignupFormInputList {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const resolver = yupResolver;
  return (
    <AuthForm formName="회원가입">
      <div></div>
    </AuthForm>
  );
}
