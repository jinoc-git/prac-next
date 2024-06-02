'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideBarLogo() {
  const router = useRouter();

  const onClickLogo = () => {
    router.push('/main');
  };

  return (
    <div
      className="flex items-center bg-white
      sm:w-[310px] sm:h-[70px] mt-[8px] mb-[4px]
      md:w-[222px] md:h-[55px]"
    >
      <Image
        src="/images/logo-color.webp"
        alt="logo"
        width={580}
        height={144}
        onClick={onClickLogo}
        className="w-[134px] h-auto ml-[74px] cursor-pointer"
      />
    </div>
  );
}
