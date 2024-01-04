'use client';

import React from 'react';

import Image from 'next/image';

import { signInWithGoogle } from '@/api/auth';

interface AuthFormProps {
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children: React.ReactNode;
}

export default function AuthForm(props: AuthFormProps) {
  const { children } = props;
  return (
    <form
      className="relative flexcol rounded-xl bg-[#F9F9FB]
    md:w-[450px] md:h-[540px] md:px-[50px] md:py-[37px] md:gap-y-2.5
    sm:w-[320px] sm:px-[30px] sm:py-[22px] sm:gap-y-2
    "
    >
      {children}
      <div className="flex justify-between items-center my-2">
        <span className="block w-5/12 h-px bg-slate-400" />
        <span className="text-slate-400">또는</span>
        <span className="block w-5/12 h-px bg-slate-400" />
      </div>
      <button
        type="button"
        name="sign-with-google-btn"
        onClick={signInWithGoogle}
        className="h-[45px] border rounded-lg border-gray_light_3 hover:bg-gray_dark_1 hover:text-white"
      >
        <div className="flex-box">
          <Image
            src="/images/google.svg"
            alt="구글 아이콘"
            width={18}
            height={18}
          />
          <span className="ml-1">구글 계정으로 시작 하기</span>
        </div>
      </button>
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
