import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const ConfirmModalLayout = ({ children }: Props) => {
  return createPortal(
    <div className="fixed inset-0 z-60 flex-box w-screen h-screen bg-black/30 animate-fadeIn">
      <div
        className="flex flex-col justify-center bg-bg_white rounded-lg gap-[16px] animate-fadeIn
          md:w-[500px] md:px-[52px] md:py-[48px]
          sm:w-[360px] sm:px-[25px] sm:py-[36px] "
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal')!,
  );
};

export default ConfirmModalLayout;
