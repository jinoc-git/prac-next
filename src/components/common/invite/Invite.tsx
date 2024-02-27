'use client';

import React from 'react';

import Image from 'next/image';

export default function Invite() {
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
              src={'/images/friend.svg'}
              width={20}
              height={15}
            />
            <label
              className="font-semibold  text-gray_dark_1 
                sm:w-[24px] sm:text-sm sm:mr-[15px]
                md:w-[30px] md:text-normal md:mr-[80px]"
            >
              동행
            </label>
          </div>
          <div className="flex items-center">
            {isOldInvitedUser ? (
              oldInvitedUser.length > 0 && (
                <div className="flex mr-3">
                  {oldInvitedUser.slice(0, maxDisplayCount).map((user) => {
                    return (
                      <img
                        alt="profile-img"
                        key={uuid()}
                        src={
                          user.avatar_url != null
                            ? user.avatar_url
                            : defaultImageGray
                        }
                        className="object-cover rounded-full
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
      {isOpen && (
        <SearchPeople closeModal={closeModal} isAnimation={isAnimation} />
      )}
    </>
  );
}
