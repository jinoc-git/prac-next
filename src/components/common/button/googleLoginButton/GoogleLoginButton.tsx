import React from 'react';

import Image from 'next/image';

import { signInWithGoogle } from '@/api/auth';

const GoogleLoginButton = () => {
  return (
    <button
      type="button"
      name="sign-with-google-btn"
      onClick={signInWithGoogle}
      className="flex-box gap-2 h-[45px] border rounded-lg border-gray_light_3 hover:bg-gray_dark_1 hover:text-white normal-transition"
    >
      <Image src="/images/svgs/google.svg" alt="구글 아이콘" width={18} height={18} />
      <span className="md:font-Regular">구글 계정으로 시작하기</span>
    </button>
  );
};

export default GoogleLoginButton;
