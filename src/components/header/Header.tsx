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
    pathname !== '/' && pathname !== '/signin' && pathname !== '/signup' && pathname !== '/main';

  return (
    <header
      className={`fixed top-0 left-0 z-30 flex justify-between items-center w-screen pr-3 
      sm:h-[80px] sm:justify-end
      md:h-[70px] md:justify-between
      ${bgWhite ? 'bg-bg_white' : 'bg-transparent'}
      `}
    >
      <Logo isLogin={isLogin} isMain={pathname === '/main'} />
      <Authentication isLogin={isLogin} />
    </header>
  );
}
