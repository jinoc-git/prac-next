import React from 'react';

import Image from 'next/image';

interface Props {
  full?: boolean;
}

const Loading = ({ full }: Props) => {
  return (
    <div
      className={`flex-box ${
        full
          ? 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-100'
          : 'w-full h-[500px]'
      }`}
    >
      <Image
        src="/images/gif/loader-all-color.gif"
        alt="로딩 스피너"
        width={48}
        height={48}
      />
    </div>
  );
};

export default Loading;
