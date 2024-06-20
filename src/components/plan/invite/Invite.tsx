'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { getMatesInfo } from '@/api/planMate';
import useModal from '@/hooks/useModal';
import { useInviteUserStoreActions, useInviteUserStoreState } from '@/store/inviteUserStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import SearchPeopleModal from './searchPeopleModal/SearchPeopleModal';

export default function Invite() {
  const { invitedUser } = useInviteUserStoreState();
  const { initUser, resetInvitedUser } = useInviteUserStoreActions();
  const { modifyState } = useModifyPlanStoreState();

  const { modalBGRef, isOpenModal, isAnimate, handleOpenModal, handleCloseModal, onClickModalBG } =
    useModal();

  const { planId } = useParams<{ planId: string }>();

  const { data } = useQuery({
    queryKey: ['planMates', planId],
    queryFn: async () => await getMatesInfo(planId),
  });

  const maxDisplayCount = 3;

  React.useEffect(() => {
    return () => resetInvitedUser();
  }, []);

  React.useEffect(() => {
    if (data) initUser(data);
  }, [data]);

  return (
    <>
      <div className="inner-content-layout md:justify-normal sm:justify-between">
        <div className="content-lable">
          <Image alt="친구 아이콘" src={'/images/svgs/friend.svg'} width={20} height={15} />
          <p>동행</p>
        </div>
        <div className="flex items-center">
          <div className="flex mr-3">
            {invitedUser.slice(0, maxDisplayCount).map((user, idx) => {
              return (
                <Image
                  alt={`profile-img ${idx}`}
                  key={`invite,${idx},${user.id}`}
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
          {invitedUser.length > maxDisplayCount ? (
            <div className="flex items-center text-gray_dark_1 sm:text-xs sm:font-semibold md:text-sm md:font-semibold">
              {invitedUser.slice(0, maxDisplayCount).map((user) => (
                <div key={`${user.id},${user.nickname}`} className="mr-[2px]">
                  {user.nickname}
                </div>
              ))}
              외 {invitedUser.length - maxDisplayCount}명
            </div>
          ) : (
            invitedUser.map((user) => (
              <div
                key={`${user.id},${user.nickname}`}
                className="mr-[2px] md:text-sm
                    sm:text-xs sm:font-semibold sm:text-gray_dark_1"
              >
                {user.nickname}&nbsp;
              </div>
            ))
          )}
        </div>
        {modifyState === 'modify' && (
          <div className="md:mt-0 sm:flex sm:justify-end sm:h-[30px] sm:mt-[5px] items-center">
            <button
              name="invite-invite-btn"
              type="button"
              className="border border-gray rounded-md text-xs p-1 ml-[8px] font-bold text-gray_dark_1 w-[45px] h-[30px] hover:bg-navy_dark hover:text-white duration-200
              sm:w-[40px] sm:h-[28px]
              md:w-[45px] md:h-[30px]"
              onClick={handleOpenModal}
            >
              추가
            </button>
          </div>
        )}
      </div>

      {isOpenModal && (
        <SearchPeopleModal
          handleCloseModal={handleCloseModal}
          isAnimate={isAnimate}
          modalBGRef={modalBGRef}
          onClickModalBG={onClickModalBG}
        />
      )}
    </>
  );
}
