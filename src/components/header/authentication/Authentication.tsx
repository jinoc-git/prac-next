'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { signOutForSB } from '@/api/auth';
import { authStore } from '@/store/authStore';
import { sideBarStore } from '@/store/sideBarStore';

export default function Authentication() {
  const { authObserver, user, resetUser } = authStore();
  const setVisibilitySideBar = sideBarStore(
    (state) => state.setVisibilitySideBar,
  );

  const router = useRouter();
  const pathname = usePathname();

  const isLogin = localStorage.getItem('isLogin');

  const onClickSignoutHandler = async () => {
    await signOutForSB();
    toast.success('로그아웃에 성공하였습니다.');
    // setMenuIsOpen(false);
    setVisibilitySideBar(false);
    resetUser();
    router.push('/signin');
  };

  useEffect(() => {
    authObserver();

    if (isLogin === 'true') setVisibilitySideBar(true);
    else setVisibilitySideBar(false);
  }, [pathname, user]);

  return (
    <div className="header-auth-box flex-box md:w-[134px] sm:w-[84px]">
      {user === null ? (
        pathname === '/signup' ? (
          <Link href="/signin">로그인</Link>
        ) : pathname === '/signin' ? (
          <Link href="/signup">회원가입</Link>
        ) : (
          <Link href="/signin">로그인</Link>
        )
      ) : (
        <button onClick={onClickSignoutHandler}>로그아웃</button>
      )}
    </div>
  );
}
