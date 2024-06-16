import React from 'react';

import Image from 'next/image';

import { signinWithKakao } from '@/api/auth';

const KakaoLoginButton = () => {
  return (
    <button
      type="button"
      name="sign-with-kakao-btn"
      onClick={signinWithKakao}
      className="flex-box gap-2 h-[45px] border rounded-lg border-gray_light_3 bg-[#FFCD00] hover:text-white normal-transition"
    >
      <Image
        src="/images/svgs/kakao.svg"
        alt="카카오 아이콘"
        width={32}
        height={32}
        className="w-[18px] h-[18px]"
      />
      <span className="md:font-Regular">카카오 계정으로 시작하기</span>
    </button>
  );
};

export default KakaoLoginButton;
