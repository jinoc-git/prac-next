'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { signUpWithSB } from '@/api/auth';
import AuthForm from '@/components/common/form/AuthForm';
import PasswordInput from '@/components/common/input/PasswordInput';
import { signupSchema } from '@/schema/formSchema';

export interface SignupFormInputList {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const resolver = yupResolver(signupSchema);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormInputList>({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<SignupFormInputList> = async (data) => {
    const { email, password, nickname } = data;
    try {
      const res = await signUpWithSB(email, password, nickname);

      if (res instanceof AuthError || res instanceof Error) {
        toast.error('회원가입에 실패하였습니다.');
        return false;
      }
      reset();

      toast.success('회원가입에 성공하였습니다');
      router.push('/main');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm formName="회원가입" onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        placeholder="특수문자 포함 8~20자 이내"
        register={register('password')}
      />
    </AuthForm>
  );
}
