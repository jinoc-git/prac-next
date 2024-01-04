'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import Logo from './logo/Logo';

export default function Header() {
  const pathname = usePathname();
  const bgWhite =
    pathname !== '/' &&
    pathname !== '/signin' &&
    pathname !== '/signup' &&
    pathname !== '/main';

  return (
    <header
      className={`flex justify-between items-center fixed w-screen pr-3 z-30 sm:h-[90px] md:h-[70px]
      ${bgWhite ? 'bg-bg_white' : 'bg-transparent'}
      `}
    >
      <Logo />
    </header>
  );
}
