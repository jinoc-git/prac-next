'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { disableScroll, enableScroll } from '@/utils/aboutScroll';

export interface ModalProps {
  isAnimate: boolean;
  modalBGRef: React.MutableRefObject<HTMLDialogElement | null>;
  onClickModalBG: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
  isPhotoModal?: boolean;
}

interface Props extends ModalProps {
  children: React.ReactNode;
}

export default function ModalLayout(props: Props) {
  const { children, isAnimate, isPhotoModal, modalBGRef, onClickModalBG } = props;

  React.useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);

  return createPortal(
    <dialog
      ref={modalBGRef}
      onClick={onClickModalBG}
      className={`fixed inset-0 z-50 flex-box w-screen h-screen bg-black/30 m-0
      ${isAnimate ? 'sm:animate-fadeIn' : 'sm:animate-fadeOut'}
      ${isPhotoModal ? 'px-3' : ''}
      `}
    >
      {isPhotoModal ? (
        children
      ) : (
        <div
          className={`flex flex-col justify-center bg-bg_white rounded-lg
          md:w-[500px] md:px-[52px] md:py-[48px] md:rounded-lg md:static
          sm:w-[320px] sm:px-[10px] sm:py-[20px] sm:gap-[16px] sm:fixed sm:bottom-0 sm:rounded-b-none
          ${
            isAnimate
              ? 'sm:animate-slideUp md:animate-fadeIn'
              : 'sm:animate-slideDown md:animate-fadeOut'
          }
          `}
        >
          {children}
        </div>
      )}
    </dialog>,
    document.getElementById('modal-portal')!,
  );
}
