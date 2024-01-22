import React from 'react';

import Image from 'next/image';

interface LogoProps {
  onClickFunc: () => void;
  isMain: boolean;
}

export default function Logo({ onClickFunc, isMain }: LogoProps) {
  return (
    <h1
      onClick={onClickFunc}
      className="cursor-pointer w-[134px] h-[33px]
      sm:ml-[20px]
      md:ml-[98px]"
    >
      <Image
        src={isMain ? '/images/logo-main.webp' : '/images/logo-color.webp'}
        alt="logo"
        width={134}
        height={33}
      />
    </h1>
  );
}
