import React from 'react';

import Image from 'next/image';

import { signInWithGoogle } from '@/api/auth';

export default function OrLineWithGoogleBtn() {
  return (
    <>
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
            src="/images/svgs/google.svg"
            alt="구글 아이콘"
            width={18}
            height={18}
          />
          <span className="ml-1">구글 계정으로 시작 하기</span>
        </div>
      </button>
    </>
  );
}
