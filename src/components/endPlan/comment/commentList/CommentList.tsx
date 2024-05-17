'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getComments } from '@/api/comment';
import { useInviteUserStoreState } from '@/store/inviteUserStore';

interface Props {
  planId: string;
}

const CommentList = ({ planId }: Props) => {
  const { invitedUser } = useInviteUserStoreState();

  const { data, isLoading } = useQuery({
    queryKey: ['commentList', planId],
    queryFn: async () => await getComments(planId),
  });

  return (
    <div className="w-full sm:py-[10px] sm:px-[10px] md:py-[30px] md:px-[20px]">
      {!data || data.length === 0 ? (
        <p className="comment-text">첫 코멘트를 입력해주세요!</p>
      ) : (
        data.map(({ content, user_id }) => {
          const author = invitedUser.find(({ id }) => user_id === id);

          return (
            <div key={uuid()} className="flex sm:gap-2 md:gap-5 comment-text">
              <Image
                src={
                  author
                    ? author.avatar_url
                      ? author.avatar_url
                      : '/images/svgs/userDefault.svg'
                    : '/images/svgs/userDefault.svg'
                }
                width={24}
                height={24}
                alt="유저 아바타 사진"
                className="object-cover rounded-full w-6 h-6 sm:hidden md:block"
              />
              <p className="w-[60px] truncate font-SemiBold sm:text-xs md:text-sm">
                {author?.nickname}
              </p>
              <p className="sm:w-[150px] md:w-[365px] sm:text-xs md:text-sm">{content}</p>
              {user_id === author?.id && (
                <button
                  name="comment-delete-btn"
                  className="flex-box border border-gray rounded-lg text-xs
                  sm:w-[50px] sm:h-[25px]
                  md:w-[45px] md:h-[30px]
                  "
                >
                  삭제
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentList;
