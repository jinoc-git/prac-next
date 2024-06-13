import React from 'react';

import Image from 'next/image';

import SigninForm from '@/components/common/form/signinForm/SigninForm';

export default function Signin() {
  return (
    <section className="flex-box w-full h-full">
      <Image
        src="/images/img-signin-bg.webp"
        alt="로그인 배경"
        width={856}
        height={1080}
        className="absolute inset-0 w-full max-w-[856px] h-screen object-cover"
        priority
      />
      <SigninForm />
    </section>
  );
}
