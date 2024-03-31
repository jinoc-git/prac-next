import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PinLayout = ({ children }: Props) => {
  return (
    <div
      className="relative flex items-center justify-between gap-4
      sm:w-[286px] sm:mb-[37px] 
      md:w-[651px] md:mx-[25px] md:ml-0"
    >
      {children}
    </div>
  );
};

export default PinLayout;
