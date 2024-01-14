'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { signUpWithSB } from '@/api/auth';
import { signupSchema } from '@/schema/formSchema';

import OrLineWithGoogleBtn from '../button/OrLineWithGoogleBtn';
import PasswordInput from '../input/PasswordInput';

export interface SignupFormInputList {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
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
    <form
      className="relative flexcol rounded-xl bg-[#F9F9FB]
    md:w-[450px] md:h-[540px] md:px-[50px] md:py-[37px] md:gap-y-2.5
    sm:w-[320px] sm:px-[30px] sm:py-[22px] sm:gap-y-2
    "
    >
      <h3 className="text-blue border-blue border-b-2 w-[64px] text-lg font-semibold">
        회원가입
      </h3>
      <PasswordInput
        placeholder="특수문자 포함 8~20자 이내"
        register={register('password')}
      />
      <OrLineWithGoogleBtn />
      <p
        className="absolute left-1/2 -translate-x-1/2 w-[235px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1 
          md:bottom-[-50px] md:bg-white/20
          sm:bottom-[-50px] sm:bg-white/50
        "
      >
        이미 계정이 있나요?
        <span
          // onClick={goToSignIn}
          className="ml-2 underline text-black cursor-pointer"
        >
          지금 로그인하세요!
        </span>
      </p>
    </form>
  );
}
