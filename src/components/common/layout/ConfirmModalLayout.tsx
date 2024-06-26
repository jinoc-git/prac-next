'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { disableScroll, enableScroll } from '@/utils/aboutScroll';

interface Props {
  children: React.ReactNode;
  modalBGRef: React.MutableRefObject<HTMLDialogElement | null>;
  onClickModalBG: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
}

const ConfirmModalLayout = ({ children, modalBGRef, onClickModalBG }: Props) => {
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
      className="fixed inset-0 z-50 flex-box w-screen h-screen bg-black/30 animate-fadeIn m-0"
    >
      <div
        className="flex flex-col justify-center bg-bg_white rounded-lg  animate-fadeIn
          md:w-[500px] md:px-[52px] md:py-[48px] md:gap-4
          sm:w-[300px] sm:px-[20px] sm:py-[20px] sm:gap-3"
      >
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-portal')!,
  );
};

export default ConfirmModalLayout;
