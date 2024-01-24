'use client';

import React from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { sideBarStore } from '@/store/sideBarStore';

export default function SideBarIcon() {
  const toggleMenu = sideBarStore((state) => state.toggleMenu);
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const pathname = usePathname();

  return (
    <button
      onClick={toggleMenu}
      aria-label="side-bar-toggle-btn"
      className=" fixed left-[24px] flex-box z-[32]
      sm:w-[34px] sm:h-[34px] sm:top-[28px] 
      md:w-[39px] md:h-[40px] md:top-[15px]
      "
    >
      <Image
        src={'/images/menu-dark.svg'}
        width={24}
        height={24}
        alt="사이드 메뉴 아이콘"
        className={` ${
          pathname === '/main' && !isSideBarOpen ? 'sm:hidden' : 'sm:block'
        }  md:block`}
      />
      <Image
        src={'/images/menu-white.svg'}
        width={24}
        height={24}
        alt="사이드 메뉴 아이콘"
        className={` ${
          pathname === '/main' && !isSideBarOpen ? 'sm:block' : 'sm:hidden'
        } md:hidden`}
      />
    </button>
  );
}
