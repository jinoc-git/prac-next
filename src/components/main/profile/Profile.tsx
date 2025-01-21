'use client';

import React from 'react';

import Image from 'next/image';

import useModal from '@/hooks/useModal';
import { useAuthStoreState } from '@/store/authStore';

import EditProfileModal from './editProfileModal/EditProfileModal';

export default function Profile() {
  const { modalBGRef, isOpenModal, isAnimate, handleOpenModal, handleCloseModal, onClickModalBG } =
    useModal();

  const user = useAuthStoreState();
  const avatarURL = user?.avatar_url || '/images/svgs/userDefault.svg';

  return (
    <section className="pt-[108px]">
      <div
        className="flex items-center my-0 mx-auto
        sm:gap-[16px] sm:w-[300px]
        md:gap-[40px] md:w-[800px]"
      >
        <div
          onClick={handleOpenModal}
          className="relative rounded-full object-cover cursor-pointer hover:opacity-75 normal-transition
            sm:w-[66px] sm:h-[66px] 
            md:w-[85px] md:h-[85px]"
        >
          <Image
            alt="user-profile-img"
            src={avatarURL}
            width={200}
            height={200}
            className="w-full h-full rounded-full border-[2.5px] border-blue_light_1 object-cover cursor-pointer"
            priority
          />

          <div
            className="absolute flex-box rounded-full bg-white  border-gray cursor-pointer
              sm:w-[20px] sm:h-[20px] sm:top-[46px] sm:left-[46px] sm:border-[1.5px]
              md:w-[24px] md:h-[24px] md:top-[60px] md:left-[60px] md:border-[2px]"
          >
            <Image alt="edit-icon" src={'/images/svgs/edit-gray.svg'} width={16} height={16} />
          </div>
        </div>
        <p className="text-white text-base font-Regular sm:text-[16px] md:text-xlg">
          <span className="cursor-pointer" onClick={handleOpenModal}>
            {user?.nickname}
          </span>
          님의 여행 계획
        </p>
      </div>
      {isOpenModal && (
        <EditProfileModal
          isAnimate={isAnimate}
          handleCloseModal={handleCloseModal}
          modalBGRef={modalBGRef}
          onClickModalBG={onClickModalBG}
        />
      )}
    </section>
  );
}
