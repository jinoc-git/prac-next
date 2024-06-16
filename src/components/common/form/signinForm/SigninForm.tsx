'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { signInWithSB } from '@/api/auth';
import { signinSchema } from '@/schema/formSchema';

import GoogleLoginButton from '../../button/googleLoginButton/GoogleLoginButton';
import KakaoLoginButton from '../../button/kakaoLoginButton/KakaoLoginButton';
import IconInput from '../../input/IconInput';
import PasswordInput from '../../input/PasswordInput';

export interface SigninFormInputList {
  email: string;
  signinPassword: string;
}

export default function SigninForm() {
  const resolver = yupResolver(signinSchema);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'onChange', resolver });

  const onSubmit: SubmitHandler<SigninFormInputList> = async (data) => {
    const { email, signinPassword: password } = data;

    const res = await signInWithSB(email, password);

    if (res instanceof AuthError) {
      toast.error('로그인에 실패하였습니다.');
      return false;
    }

    reset();
    toast.success('로그인에 성공하였습니다.');
    router.push('/main');
    router.refresh();
  };

  const goToSignUp = () => {
    router.push('/signup');
  };

  return (
    <form
      className="position-center flexcol gap-y-2.5 rounded-xl bg-[#F9F9FB]
        md:w-[450px] md:px-[50px] md:py-[37px]
        sm:w-[320px] sm:px-[30px] sm:py-[22px]
        "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="border-b-2 w-[48px] text-lg font-semibold	text-blue border-blue">로그인</h3>
      <IconInput
        name="email"
        placeholder="이메일을 입력해주세요."
        register={register('email')}
        leftIcon={{
          src: '/images/svgs/message.svg',
          alt: '이메일 아이콘',
          w: 10,
          h: 12,
        }}
      />
      <PasswordInput
        name="password"
        placeholder="특수문자 포함 8~20자 이내"
        register={register('signinPassword')}
        errors={errors}
      />
      <button
        disabled={isSubmitting || !isValid}
        name="signup-submit-btn"
        className="h-[45px] rounded-lg text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3 normal-transition"
      >
        로그인
      </button>
      <div className="flex justify-between items-center my-2">
        <span className="block w-5/12 h-px bg-slate-400" />
        <span className="text-slate-400">또는</span>
        <span className="block w-5/12 h-px bg-slate-400" />
      </div>
      <GoogleLoginButton />
      <KakaoLoginButton />
      <p
        className="absolute left-1/2 -translate-x-1/2 w-[190px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1
          md:bottom-[-50px] md:bg-white/20
          sm:bottom-[-60px] sm:bg-white/50
        "
      >
        처음이신가요?
        <span onClick={goToSignUp} className="ml-2 underline text-black cursor-pointer">
          지금 등록하세요!
        </span>
      </p>
    </form>
  );
}
