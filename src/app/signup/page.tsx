import React from 'react';

import Image from 'next/image';

import SignupForm from '@/components/common/form/SignupForm';

export default function Signup() {
  return (
    <section className="flex-box w-full h-full">
      <Image
        src="/images/img-signup-bg.webp"
        alt="회원가입 배경"
        width={856}
        height={1080}
        className="absolute inset-0 w-full max-w-[856px] h-screen object-cover"
        priority
      />
      <SignupForm />
    </section>
  );
}
