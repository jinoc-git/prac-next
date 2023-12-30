import React from 'react';

import Image from 'next/image';

interface LogoProps {
  onClickFunc: () => void;
}

export default function Logo({ onClickFunc }: LogoProps) {
  return (
    <h1
      onClick={onClickFunc}
      className="cursor-pointer w-[134px] h-[33px]
      sm:ml-[10px]
      md:ml-[88px]"
    >
      <Image
        src="/images/img-traduler-logo-color-4x.webp"
        alt="logo"
        width={134}
        height={33}
      />
    </h1>
  );
}
