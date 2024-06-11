'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Image from 'next/image';

import useComment from '@/hooks/useComment';
import { useAuthStoreState } from '@/store/authStore';

import type { InsertCommentsType } from '@/types/supabase';

interface CommentInputType {
  comment: string;
}

interface Props {
  planId: string;
}

const CommentForm = ({ planId }: Props) => {
  const user = useAuthStoreState();
  const { addCommentMutate } = useComment(planId);

  const { register, handleSubmit, reset, setFocus } = useForm<CommentInputType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CommentInputType> = (data) => {
    if (data.comment === '' || data.comment.length > 20) {
      toast.error('1 ~ 20자 이내로 작성해주세요.');
      setFocus('comment');
      return;
    }

    if (user) {
      const newComment: InsertCommentsType = {
        content: data.comment,
        user_id: user.id,
        plan_id: planId,
      };

      addCommentMutate(newComment);
      reset();
    }
  };

  return (
    <form
      name="comment-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between sm:pb-[60px] md:pb-[100px]"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="comment">
          <Image
            src={'/images/svgs/pencil.svg'}
            alt="연필 아이콘"
            width={20}
            height={20}
            className=" w-5 h-5"
          />
        </label>
        <input
          id="comment"
          type="text"
          {...register('comment')}
          placeholder="20자 이내 한 줄 코멘트를 남겨주세요!"
          className=" px-3 py-2 border border-[#d1d1d1] rounded-lg 
          sm:w-[250px] sm:h-[28px] sm:text-sm
          md:w-[460px] md:h-[34px] ms:text-normal"
        />
      </div>
      <button className="flex-box gap-1 py-1 sm:px-1 md:px-2 border border-[#d1d1d1] rounded hover:bg-[#F2F7FF] normal-transition">
        <Image
          src={'/images/svgs/check.svg'}
          alt="연필 아이콘"
          width={20}
          height={20}
          className=" w-5 h-5"
        />
        <span className="text-sm sm:hidden md:block">작성</span>
      </button>
    </form>
  );
};

export default CommentForm;
