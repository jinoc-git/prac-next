'use client';

import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import _ from 'lodash';
import Image from 'next/image';

import { findUsers } from '@/api/planMate';
import useConfirm from '@/hooks/useConfirm';
import { useAuthStoreState } from '@/store/authStore';
import { useInviteUserStoreActions, useInviteUserStoreState } from '@/store/inviteUserStore';
import { searchCallback } from '@/utils/arrayCallbackFunctionList';

import InvitedOrSearchUser from './invitedOrSearchUser/InvitedOrSearchUser';
import ModalLayout from '../../../common/layout/ModalLayout';

import type { ModalProps } from '../../../common/layout/ModalLayout';
import type { UserType } from '@/types/supabase';

interface Props extends ModalProps {
  handleCloseModal: () => void;
  isAnimate: boolean;
}

interface SearchPeopleInputType {
  userInfo: string;
}

export default function SearchPeopleModal(props: Props) {
  const { modalBGRef, handleCloseModal, isAnimate, onClickModalBG } = props;

  const { invitedUser } = useInviteUserStoreState();
  const { inviteUser, setUser, syncInvitedUser } = useInviteUserStoreActions();
  const user = useAuthStoreState();
  const confirm = useConfirm();

  const [people, setPeople] = React.useState<UserType[]>([]);

  const {
    register,
    formState: { errors },
  } = useForm<SearchPeopleInputType>({ mode: 'onChange' });

  const searchUser: SubmitHandler<SearchPeopleInputType> = async (data) => {
    if (data.userInfo === '') {
      setPeople([]);
      return;
    }

    try {
      const res = await findUsers(data.userInfo);

      if (res.nickname != null && res.email != null) {
        const searchedPeople: UserType[] = [];
        searchedPeople.push(...res.nickname);
        searchedPeople.push(...res.email.filter(searchCallback.isNotInvite(searchedPeople)));
        setPeople(searchedPeople);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const debouncedSearchUser = _.debounce(searchUser, 300);

  const handleInvite = async (user: UserType) => {
    const confTitle = '동행 초대';
    const confDesc = '해당 여행에 초대하시겠습니까?';
    const confFunc = () => {
      inviteUser(user);
    };
    confirm.default(confTitle, confDesc, confFunc);
  };

  const deleteUser = (idx: number) => {
    const confTitle = '동행 초대 삭제';
    const confDesc = '해당 여행에서 삭제하시겠습니까?';
    const confFunc = () => {
      const deletedUser = invitedUser.filter(searchCallback.cancelInvite(idx));
      setUser(deletedUser);
    };
    confirm.delete(confTitle, confDesc, confFunc);
  };

  const saveInviteData = () => {
    setUser(invitedUser);
    toast.success('동행자가 추가됐습니다.');
    handleCloseModal();
    syncInvitedUser();
  };

  const searchResult = people.filter(searchCallback.excludeInvitedUsers(invitedUser));

  return (
    <ModalLayout isAnimate={isAnimate} modalBGRef={modalBGRef} onClickModalBG={onClickModalBG}>
      <div className="flex flex-col items-start justify-end gap-2">
        <p className="text-lg font-bold text-navy">동행 초대하기</p>
        <p className="text-[gray] text-normal  ">이 여행에 함께할 친구를 초대해 보세요!</p>
      </div>
      <div className="flex flex-col md:gap-[10px] sm:gap-[28px]">
        <div>
          <label className="text-gray-dark-1 font-inter font-bold md:text-xs sm:sm leading-[24px]">
            초대한 사람 보기
          </label>
          <div
            className={`flex flex-col items-center md:w-[396px] sm:w-full h-[126px] bg-white rounded-lg scrollbar-custom ${
              invitedUser.length > 2 ? 'overflow-y-scroll' : ''
            }`}
          >
            {invitedUser.length !== 0 &&
              invitedUser.map((person, idx) => {
                return (
                  <div key={uuid()} className="w-full ">
                    <InvitedOrSearchUser
                      user={user}
                      person={person}
                      idx={idx}
                      deleteUser={deleteUser}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-dark-1 font-inter font-bold md:text-xs sm:sm leading-[24px]">
            동행 찾기
          </label>
          <div className="relative flex items-center ">
            <span className="absolute ml-3 text-gray-400 focus-within:text-gray ">
              <Image alt="돋보기 아이콘" src={'/images/svgs/search.svg'} width={20} height={20} />
            </span>
            <input
              placeholder="닉네임 또는 이메일 주소로 초대할 사람을 검색하세요."
              {...register('userInfo', {
                pattern: {
                  value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
                  message: '모음, 자음 안됨',
                },
              })}
              onChange={(e) => {
                const inputValue = e.target.value.trim();
                debouncedSearchUser({ userInfo: inputValue });
              }}
              className="h-10 pl-10 pr-3 border border-none rounded-lg w-[396px] md:text-sm sm:text-xs "
            />
          </div>
          <p>{errors?.userInfo?.message}</p>
        </div>
        <div
          className={`flex flex-col items-center w-full md:h-[240px] sm:h-[240px] bg-white rounded-lg md:mt-3 sm:mt-0 scrollbar-custom ${
            people.length === 0 ? '' : 'overflow-y-scroll'
          }`}
        >
          {people.length === 0 && (
            <div className="flex items-center justify-center text-center mt-[110px] md:text-normal sm:text-sm">
              검색 결과가 없습니다.
            </div>
          )}
          {searchResult.map((person: UserType, idx) => {
            return (
              <div key={uuid()} className="w-full">
                <InvitedOrSearchUser
                  user={user}
                  person={person}
                  idx={idx}
                  handleInvite={handleInvite}
                />
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center mt-auto space-x-4">
          <button
            name="invite-cancel-btn"
            onClick={handleCloseModal}
            className="md:w-[12.5rem] md:h-[2.75rem] sm:w-[150px] sm:h-[40px] rounded-lg border border-navy bg-white text-navy  hover:bg-navy_light_1 hover:text-navy_dark hover:border-navy_light_3"
          >
            취소
          </button>
          <button
            name="invite-add-person-btn"
            onClick={saveInviteData}
            className="md:w-[12.5rem] md:h-[2.75rem] sm:w-[150px] sm:h-[40px] bottom-0 mx-auto  rounded-lg border border-navy bg-navy text-white  hover:bg-navy_light_3 hover:border-bg-navy_light_3"
          >
            저장
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
