'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { useAuthStoreState } from '@/store/authStore';

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(true);
  const user = useAuthStoreState();

  const onClickOpenModalHandler = () => {
    setAnimate(true);
    setIsEditModalOpen(true);
  };

  const onClickCloseModalHandler = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsEditModalOpen(false);
    }, 400);
  };

  return (
    <section className="pt-[108px]">
      <div
        className="flex items-center my-0 mx-auto
      sm:gap-[16px] sm:w-[310px]
      md:gap-[40px] md:w-[800px]"
      >
        <div
          onClick={onClickOpenModalHandler}
          className="relative rounded-full object-cover cursor-pointer hover:opacity-75
          sm:w-[66px] sm:h-[66px] 
          md:w-[85px] md:h-[85px]"
        >
          {user !== null && typeof user.avatar_url === 'string' ? (
            <Image
              alt="main-profile-img"
              src={user.avatar_url}
              width={85}
              height={85}
              className="rounded-full border-[2.5px] border-blue_light_1 object-cover cursor-pointer
              sm:w-[66px] sm:h-[66px]
              md:w-[85px] md:h-[85px]"
            />
          ) : (
            <Image
              alt="main-profile-img"
              src={'/images/svgs/userDefault.svg'}
              width={85}
              height={85}
              className="sm:w-[66px] sm:h-[66px]
              md:w-[85px] md:h-[85px]"
            />
          )}
          <div
            className="absolute flex-box rounded-full bg-white  border-gray cursor-pointer
          sm:w-[20px] sm:h-[20px] sm:top-[46px] sm:left-[46px] sm:border-[1.5px]
          md:w-[24px] md:h-[24px] md:top-[60px] md:left-[60px] md:border-[2px]"
          >
            <Image
              alt="edit-icon"
              src={'/images/svgs/edit-gray.svg'}
              width={14}
              height={12}
            />
          </div>
        </div>
        <p className="text-white text-base font-Regular sm:text-[16px] md:text-xlg">
          <span className="cursor-pointer" onClick={onClickOpenModalHandler}>
            {user?.nickname}
          </span>
          님의 여행 계획
        </p>
      </div>
      {/* {isEditModalOpen && (
        <EditProfileModal
          animate={animate}
          onClickCloseModalHandler={onClickCloseModalHandler}
        />
      )} */}
    </section>
  );
}
