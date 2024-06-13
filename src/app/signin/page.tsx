import React from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getSessionFromServer } from '@/api/serverAction';
import SigninForm from '@/components/common/form/signinForm/SigninForm';

export default async function Signin() {
  const session = await getSessionFromServer();

  if (session) redirect('/main');

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
