'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { authStore } from '@/store/authStore';

import Authentication from './authentication/Authentication';
import Logo from './logo/Logo';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const user = authStore((state) => state.user);

  const bgWhite =
    pathname !== '/' &&
    pathname !== '/signin' &&
    pathname !== '/signup' &&
    pathname !== '/main';

  const onClickLogo = () => {
    if (user !== null) router.push('/main');
    else router.push('/');
  };

  return (
    <header
      className={`flex justify-between items-center fixed w-screen pr-3 z-30 sm:h-[90px] md:h-[70px]
      ${bgWhite ? 'bg-bg_white' : 'bg-transparent'}
      `}
    >
      <Logo onClickFunc={onClickLogo} isMain={pathname === '/main'} />
      <Authentication />
    </header>
  );
}
