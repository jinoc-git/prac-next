'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return pathname === '/' ? (
    <footer className="w-full bg-[#292B22] pt-8 pb-5">
      <div className="mx-auto max-w-[1130px] md:w-5/6 sm:w-[310px]">
        <Image
          src="/images/svgs/logo.svg"
          alt="로고"
          width={134}
          height={40}
          className="md:mb-[20px] sm:mb-[10px]"
        />
        <hr className="border-[#A9AAA7] md:w-[100%] sm:w-[134px] " />
        <div className="flex justify-between md:flex-row gap-[20px] md:text-[16px] sm:text-[14px] sm:flex-col">
          <div className="md:w-1/3 ">
            <p className="font-bold  text-white md:mt-8 sm:mt-[24px]">서비스 소개</p>
            <div className="text-[#A9AAA7] mt-2">
              <p>Traduler는 여행의 전 과정을 담당하여 하나뿐인 여행을</p>
              <p>더욱 특별하게 만들어 줍니다.</p>
            </div>
            <div className="text-[#A9AAA7] md:mt-8 sm:mt-[24px]">
              <p>당신의 소중한 추억이</p>
              <p>오래도록 아름답게 기억되었으면 좋겠습니다.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <p className="font-bold text-white md:mt-8 sm:mt-[24px]">함께한 사람들</p>
            <div className="text-[#A9AAA7]  mt-2">
              <p>Front-end Engineer</p>
              <p>노진철</p>
            </div>
            <div className="text-[#A9AAA7]  mt-4">
              <p>UX/UI Designer</p>
              <p>류해민</p>
            </div>
          </div>
          <div className="md:w-1/4">
            <p className="font-bold text-white mb-2 md:mt-8  sm:mt-[24px]">GitHub</p>
            <Link
              href={'https://github.com/jinoc-git/traduler-next'}
              aria-label="깃허브 링크"
              target="_blank"
              rel="noopener noreferrer"
              className=" w-[40px]"
            >
              <Image src="/images/svgs/github.svg" alt="로고" width={40} height={40} />
            </Link>
          </div>
        </div>

        <p className="md:mt-20  md:text-normal sm:text-sm sm:mt-[24px] text-[#A9AAA7] ">
          &copy; 2024 — TRADULER.
        </p>
      </div>
    </footer>
  ) : null;
};

export default Footer;
