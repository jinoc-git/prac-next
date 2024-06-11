import React from 'react';

import Image from 'next/image';

import CommentForm from './commentForm/CommentForm';
import CommentList from './commentList/CommentList';

interface Props {
  planId: string;
}

const Comment = ({ planId }: Props) => {
  return (
    <section className="content-layout mt-[60px]">
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
      <CommentList planId={planId} />
      <CommentForm planId={planId} />
    </section>
  );
};

export default Comment;
