'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  isLogin: boolean;
  isMain: boolean;
}

export default function Logo({ isLogin, isMain }: Props) {
  const router = useRouter();

  const onClickLogo = () => {
    if (isLogin) router.push('/main');
    else router.push('/');
  };

  return (
    <h1
      onClick={onClickLogo}
      className="cursor-pointer w-[134px] h-[33px]
      sm:position-center
      md:ml-[98px] md:static md:translate-x-0 md:translate-y-0"
    >
      <Image
        src={isMain ? '/images/logo-main.webp' : '/images/logo-color.webp'}
        alt="logo"
        width={134}
        height={33}
        className="w-full h-full"
      />
    </h1>
  );
}
