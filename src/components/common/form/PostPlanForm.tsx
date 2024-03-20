'use client';

import React, { useEffect } from 'react';
import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import AddPlanDate from '@/components/addPlan/AddPlanDate';
import { authStore } from '@/store/authStore';
import { inviteUserStore } from '@/store/inviteUserStore';
import { modifyPlanStore } from '@/store/modifyPlanStore';

import Invite from '../invite/Invite';

import type { AddPlanContentsInputType } from '@/components/addPlan/AddPlanContents';

interface PostPlanFormProps {
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors<AddPlanContentsInputType>;
}

export default function PostPlanForm(props: PostPlanFormProps) {
  const { register, errors } = props;
  const setModify = modifyPlanStore((state) => state.setModify);
  const { inviteUser, syncInvitedUser } = inviteUserStore(
    ({ inviteUser, syncInvitedUser }) => ({ inviteUser, syncInvitedUser }),
  );
  const user = authStore(({ user }) => user);

  useEffect(() => {
    setModify();
  }, []);

  useEffect(() => {
    if (user) {
      inviteUser(user);
      syncInvitedUser();
    }
  }, [user]);

  return (
    <form
      className="flex flex-col mx-auto
        sm:mt-[32px] sm:w-[310px]
        md:mt-[100px] md:w-[720px] md:px-[10px]"
    >
      <input
        id="title"
        type="text"
        placeholder="여행 제목을 입력하세요."
        {...register}
        className="border-b-[1px] border-gray w-full outline-none font-bold placeholder:text-gray  text-black
            sm:text-[20px]
            md:text-[24px] "
      />
      <p
        className="text-xs font-bold text-red-600
            sm:h-[8px] sm:w-[297px]
            md:h-[15px]"
      >
        {errors?.title?.message}
      </p>
      <AddPlanDate state="addPlan" />
      <Invite />
    </form>
  );
}
