import React from 'react';

import Image from 'next/image';

interface Props {
  avatarList: (string | null | undefined)[];
  nicknameList: string[];
}

export default function PlanCardUserList(props: Props) {
  const { avatarList, nicknameList } = props;
  return (
    <div
      className="gap-3 font-Regular text-gray_dark_1 
    sm:mt-[4px] sm:hidden
    md:mt-[8px] md:flex"
    >
      <div className="flex">
        {avatarList.map((avatar, i) => {
          let gap = '';
          if (i > 0) {
            gap = '-ml-[8px]';
          }

          return avatar ? (
            <Image
              key={`${i},${avatar}`}
              src={avatar}
              alt="유저아바타"
              width={200}
              height={200}
              unoptimized
              className={`w-[20px] h-[20px] rounded-full ${gap} border border-[#979797] object-cover `}
            />
          ) : (
            <Image
              key={`${i},avatar`}
              src={'/images/svgs/userDefault.svg'}
              alt="유저 기본 이미지"
              width={20}
              height={20}
              className={`w-[20px] h-[20px] rounded-full ${gap} border border-[#979797] object-cover `}
            />
          );
        })}
      </div>
      <div className='"text-gray_dark_1 md:text-sm sm:text-[8px]'>
        {nicknameList.length <= 3 ? (
          nicknameList.map((name) => `${name}`).join(', ')
        ) : (
          <>
            {nicknameList.slice(0, 3).join(', ')} 외 {nicknameList.length - 3}명
          </>
        )}
      </div>
    </div>
  );
}
