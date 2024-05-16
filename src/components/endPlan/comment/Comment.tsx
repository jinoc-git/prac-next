import React from 'react';

import Image from 'next/image';

const Comment = () => {
  return (
    <section className="content-layout">
      <div className="content-lable w-full">
        <Image
          src={'/images/svgs/comment.svg'}
          width={20}
          height={20}
          alt="코멘트 아이콘"
          className="w-[20px] h-[20px]"
        />
        <p>한 줄 코멘트</p>
      </div>
    </section>
  );
};

export default Comment;
