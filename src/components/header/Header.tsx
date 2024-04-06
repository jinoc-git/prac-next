'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import Authentication from './authentication/Authentication';
import Logo from './logo/Logo';

import type { Session } from '@supabase/supabase-js';

interface Props {
  session: Session | null;
}

export default function Header({ session }: Props) {
  const pathname = usePathname();
  const isLogin = session !== null;

  const bgWhite =
    pathname !== '/' &&
    pathname !== '/signin' &&
    pathname !== '/signup' &&
    pathname !== '/main';

  return (
    <header
      className={`flex top-0 left-0 justify-between items-center fixed w-screen pr-3 z-30 sm:h-[80px] md:h-[70px]
      ${bgWhite ? 'bg-bg_white' : 'bg-transparent'}
      `}
    >
      <Logo isLogin={isLogin} isMain={pathname === '/main'} />
      <Authentication isLogin={isLogin} />
    </header>
  );
}
