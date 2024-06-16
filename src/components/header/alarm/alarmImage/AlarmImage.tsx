'use client';

import React from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Props {
  hasNew: boolean;
}

const AlarmImage = ({ hasNew }: Props) => {
  const pathname = usePathname();

  const isWhiteNone = pathname === '/main' && !hasNew;
  const isGrayNone = pathname !== '/main' && !hasNew;
  const isWhiteActive = pathname === '/main' && hasNew;
  const isGrayActive = pathname !== '/main' && hasNew;

  if (isWhiteNone) {
    return <Image src={'/images/svgs/bell-white.svg'} width={24} height={24} alt="알람 아이콘" />;
  }

  if (isGrayNone) {
    return <Image src={'/images/svgs/bell-gray.svg'} width={24} height={24} alt="알람 아이콘" />;
  }

  if (isWhiteActive) {
    return (
      <Image src={'/images/svgs/bell-active-white.svg'} width={24} height={24} alt="알람 아이콘" />
    );
  }
  if (isGrayActive) {
    return (
      <Image src={'/images/svgs/bell-active-gray.svg'} width={24} height={24} alt="알람 아이콘" />
    );
  }

  return null;
};

export default AlarmImage;
