'use client';

import React from 'react';

import OrLineWithGoogleBtn from '../button/OrLineWithGoogleBtn';

interface AuthFormProps {
  formName: string;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children?: React.ReactNode;
}

export default function AuthForm(props: AuthFormProps) {
  const { formName, children } = props;
  return (
    <form
      className="relative flexcol rounded-xl bg-[#F9F9FB]
    md:w-[450px] md:h-[540px] md:px-[50px] md:py-[37px] md:gap-y-2.5
    sm:w-[320px] sm:px-[30px] sm:py-[22px] sm:gap-y-2
    "
    >
      <h3 className="text-blue border-blue border-b-2 w-[64px] text-lg font-semibold">
        {formName}
      </h3>
      {children}
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
