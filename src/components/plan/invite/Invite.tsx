'use client';

import React, { useEffect, useState } from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { getMates } from '@/api/planMate';
import {
  useInviteUserStoreActions,
  useInviteUserStoreState,
} from '@/store/inviteUserStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import SearchPeopleModal from './SearchPeopleModal';

export default function Invite() {
  const { oldInvitedUser } = useInviteUserStoreState();
  const { inviteUser, resetInvitedUser, syncInvitedUser } =
    useInviteUserStoreActions();
  const { modifyState } = useModifyPlanStoreState();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const { planId } = useParams<{ planId: string }>();

  const { data } = useQuery({
    queryKey: ['planMates', planId],
    queryFn: async () => {
      if (planId) return await getMates(planId);
      else return null;
    },
  });

  const openModal = () => {
    setIsOpenModal(true);
    setIsAnimate(true);
  };

  const closeModal = () => {
    setIsAnimate(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 400);
  };

  const isOldInvitedUser =
    oldInvitedUser.length !== 0 && oldInvitedUser !== null;
  const maxDisplayCount = 3;

  useEffect(() => {
    return () => resetInvitedUser();
  }, []);

  useEffect(() => {
    if (data) {
      resetInvitedUser();
      data.forEach((user) => {
        inviteUser(user);
      });
      syncInvitedUser();
    }
  }, [data]);

  return (
    <>
      <div
        className="flex 
          sm:w-[286px] sm:mx-auto sm:justify-normal sm:flex-col
          md:w-[700px] md:h-[30px] md:mx-[6px] md:my-[10px]  md:flex-row md:justify-normal md:items-center "
      >
        <div className="flex sm:justify-between md:justify-start">
          <div
            className="flex items-center 
            sm:gap-[8px] 
            md:gap-2"
          >
            <Image
              alt="친구 아이콘"
              src={'/images/svgs/friend.svg'}
              width={20}
              height={15}
            />
            <p
              className="font-semibold  text-gray_dark_1 
                sm:w-[24px] sm:text-sm sm:mr-[15px]
                md:w-[30px] md:text-normal md:mr-[80px]"
            >
              동행
            </p>
          </div>
          <div className="flex items-center">
            {isOldInvitedUser ? (
              oldInvitedUser.length > 0 && (
                <div className="flex mr-3">
                  {oldInvitedUser.slice(0, maxDisplayCount).map((user, idx) => {
                    return (
                      <Image
                        alt={`profile-img ${idx}`}
                        key={uuid()}
                        src={user.avatar_url ?? '/images/svgs/userDefault.svg'}
                        width={24}
                        height={24}
                        className="object-cover rounded-full border-[#DCDCDC] border-[1px]
                          sm:w-[16px] sm:h-[16px]
                          md:w-6 md:h-6"
                      />
                    );
                  })}
                </div>
              )
            ) : (
              <div className="w-6 h-6 mr-5 rounded-full bg-gray_light_3" />
            )}
            {isOldInvitedUser ? (
              oldInvitedUser.length > maxDisplayCount ? (
                <div className="flex items-center text-gray_dark_1 sm:text-xs sm:font-semibold md:text-sm md:font-semibold">
                  {oldInvitedUser.slice(0, maxDisplayCount).map((user) => (
                    <div key={uuid()} className="mr-[2px]">
                      {user.nickname}
                    </div>
                  ))}
                  외 {oldInvitedUser.length - maxDisplayCount}명
                </div>
              ) : (
                oldInvitedUser.map((user) => (
                  <div
                    key={uuid()}
                    className="mr-[2px] md:text-sm
                    sm:text-xs sm:font-semibold sm:text-gray_dark_1"
                  >
                    {user.nickname}&nbsp;
                  </div>
                ))
              )
            ) : (
              <div className="sm:w-[50px] sm:h-[21px] sm:text-sm sm:font-semibold sm:text-gray_dark_1">
                로딩중...
              </div>
            )}
          </div>
        </div>
        {modifyState === 'modify' && (
          <div className="md:mt-0 sm:flex sm:justify-end sm:h-[30px] sm:mt-[5px] items-center">
            <button
              name="invite-invite-btn"
              type="button"
              className="border border-gray rounded-md text-xs p-1 ml-[8px] font-bold text-gray_dark_1 w-[45px] h-[30px] hover:bg-navy_dark hover:text-white duration-200
              sm:w-[40px] sm:h-[28px]
              md:w-[45px] md:h-[30px]"
              onClick={openModal}
            >
              추가
            </button>
          </div>
        )}
      </div>
      {isOpenModal && (
        <SearchPeopleModal closeModal={closeModal} isAnimate={isAnimate} />
      )}
    </>
  );
}
