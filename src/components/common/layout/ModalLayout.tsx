import React from 'react';
import { createPortal } from 'react-dom';

interface ModalLayoutProps {
  children: React.ReactNode;
  isAnimate: boolean;
}

export default function ModalLayout(props: ModalLayoutProps) {
  const { children, isAnimate } = props;
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex-box w-screen h-screen bg-black/30 
      ${isAnimate ? 'sm:animate-fadeIn' : 'sm:animate-fadeOut'}`}
    >
      <div
        className={`flex flex-col justify-center bg-bg_white rounded-lg
        md:w-[500px]  md:px-[52px] md:py-[48px] md:rounded-lg md:static
        sm:w-[360px] sm:px-[25px] sm:py-[36px] sm:gap-[16px] sm:fixed sm:bottom-0 sm:rounded-b-none
      ${
        isAnimate
          ? 'sm:animate-slideUp md:animate-fadeIn'
          : 'sm:animate-slideDown md:animate-fadeOut'
      }
      `}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal')!,
  );
}
