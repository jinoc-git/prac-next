'use client';

import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { signOutForSB } from '@/api/auth';
import { useAuthStoreActions } from '@/store/authStore';
import { useSideBarStoreActions } from '@/store/sideBarStore';

interface Props {
  isLogin: boolean;
}

export default function Authentication({ isLogin }: Props) {
  const { resetUser } = useAuthStoreActions();
  const { setVisibilitySideBar } = useSideBarStoreActions();

  const router = useRouter();
  const pathname = usePathname();

  const onClickSignoutHandler = async () => {
    await signOutForSB();

    toast.success('로그아웃에 성공하였습니다.');
    setVisibilitySideBar(false);
    resetUser();

    router.push('/signin');
    router.refresh();
  };

  const isSigninPage = pathname === '/signin';

  return (
    <div className="header-link-box flex-box md:w-[134px] sm:w-[84px]">
      {!isLogin ? (
        isSigninPage ? (
          <Link href="/signup">회원가입</Link>
        ) : (
          <Link href="/signin">로그인</Link>
        )
      ) : (
        <button
          onClick={onClickSignoutHandler}
          className={`${
            pathname === '/main' ? 'text-white' : 'text-black'
          } sm:text-xs md:text-normal`}
        >
          {pathname === '/main' ? (
            <Image
              src={'/images/svgs/logout-white.svg'}
              width={24}
              height={24}
              alt="로그아웃 아이콘"
              className="w-5 h-5"
            />
          ) : (
            <Image
              src={'/images/svgs/logout-gray.svg'}
              width={24}
              height={24}
              alt="로그아웃 아이콘"
              className="w-5 h-5"
            />
          )}
        </button>
      )}
    </div>
  );
}
