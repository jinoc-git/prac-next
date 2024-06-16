'use client';

import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { signOutForSB } from '@/api/auth';
import { useAuthStoreActions } from '@/store/authStore';
import { useSideBarStoreActions } from '@/store/sideBarStore';

interface Props {
  isOpen: boolean;
}

const Logout = ({ isOpen }: Props) => {
  const router = useRouter();

  const { resetUser } = useAuthStoreActions();
  const { setVisibilitySideBar } = useSideBarStoreActions();

  const onClickSignoutHandler = async () => {
    await signOutForSB();

    toast.success('로그아웃에 성공하였습니다.');
    setVisibilitySideBar(false);
    resetUser();

    router.push('/signin');
    router.refresh();
  };

  return (
    <div
      onClick={onClickSignoutHandler}
      className={`flex items-center gap-8 w-[222px] rounded-[8px] cursor-pointer side-bar-transition
        sm:w-[310px] md:w-[222px] 
        ${isOpen ? 'hover:bg-[#e7e7e7]' : ''}
      `}
    >
      <button
        aria-label="sidebar-signout-btn"
        className="flex-box w-[40px] h-[40px] rounded-lg hover:bg-[#e7e7e7] side-bar-transition"
      >
        <Image src={'/images/svgs/logout.svg'} width={20} height={21} alt="로그아웃 아이콘" />
      </button>
      <p className=" font-Regular text-navy">로그아웃</p>
    </div>
  );
};

export default Logout;
