'use client';

import React from 'react';

import Image from 'next/image';

export default function SideBar() {
  return (
    <>
      <button
        aria-label="sidebar-toggle-btn"
        className=" fixed left-[24px] flex-box z-[32]
          sm:w-[34px] sm:h-[34px] sm:top-[36px] 
          md:w-[39px] md:h-[40px] md:top-[15px]"
      >
        <Image
          src={'/images/menu-dark.svg'}
          width={24}
          height={24}
          alt="사이드 메뉴 아이콘"
          className="sm:hidden md:block"
        />
        <Image
          src={'/images/menu-white.svg'}
          width={24}
          height={24}
          alt="사이드 메뉴 아이콘"
          className="sm:block md:hidden"
        />
      </button>
      <aside></aside>
    </>
  );
}
