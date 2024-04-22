'use client';

import React from 'react';

import Image from 'next/image';

import type { UserType } from '@/types/supabase';

interface InvitedOrSearchUserProps {
  user: UserType | null;
  person: UserType;
  idx: number;
  handleInvite?: (user: UserType) => Promise<void>;
  deleteUser?: (idx: number) => void;
}

export default function InvitedOrSearchUser(props: InvitedOrSearchUserProps) {
  const { user, person, idx, handleInvite, deleteUser } = props;

  return (
    <div className="flex items-center justify-between mr-5 ">
      <div className="flex items-center justify-start gap-3 my-2 ml-5">
        <Image
          className="object-cover rounded-full md:w-[45px] md:h-[45px] sm:w-[55px] sm:h-[55px]"
          src={person.avatar_url ?? '/images/svgs/userDefault.svg'}
          width={45}
          height={45}
          alt={`${person.nickname} avatar image`}
        />
        <div>
          <p className="text-normal text-blue">{person.nickname}</p>
          <p className="sm:text-xs md:text-sm text-gray">{person.email}</p>
        </div>
      </div>
      {user?.id !== person.id && (
        <button
          name="userlist-multifunctional-btn"
          className="md:w-[45px] md:h-[30px] sm:w-[35px] sm:h-[20px] border rounded-lg cursor-pointer text-gray_dark_2 border-gray_dark_1 hover:bg-blue_dark hover:text-white text-xs hover:border-blue font-semibold"
          onClick={
            handleInvite
              ? async () => {
                  await handleInvite(person);
                }
              : () => deleteUser?.(idx)
          }
        >
          {handleInvite != null ? '초대' : '삭제'}
        </button>
      )}
    </div>
  );
}
