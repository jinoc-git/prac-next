'use client';

import React from 'react';

import Image from 'next/image';

import ModalLayout from '@/components/common/layout/ModalLayout';

import type { ModalProps } from '@/components/common/layout/ModalLayout';

interface Props extends ModalProps {
  handleCloseModal: () => void;
  src: string;
}

const PhotoModal = ({ isAnimate, handleCloseModal, src, modalBGRef, onClickModalBG }: Props) => {
  return (
    <ModalLayout
      isAnimate={isAnimate}
      isPhotoModal={true}
      modalBGRef={modalBGRef}
      onClickModalBG={onClickModalBG}
    >
      <div className="relative w-full h-auto max-w-[600px] max-h-[600px] bg-white">
        <button
          onClick={handleCloseModal}
          type="button"
          className=" absolute top-[-30px] md:right-[-30px] sm:right-0"
        >
          <Image
            src="/images/svgs/close.svg"
            alt="닫기 아이콘"
            width={30}
            height={30}
            className="sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
          />
        </button>
        <Image
          src={src}
          width={230}
          height={230}
          alt="여행 이미지"
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </ModalLayout>
  );
};

export default PhotoModal;
