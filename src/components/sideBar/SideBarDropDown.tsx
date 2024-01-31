import React, { useCallback } from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import type { PlanType } from '@/types/supabase';

interface SideBarDropDownProps {
  activeDropDown: boolean;
  aboveDropDownIsOpen: boolean;
  filterName: '즐겨찾기 한 목록' | '예정된 여행' | '다녀온 여행';
  planList: PlanType[] | [];
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBarDropDown(props: SideBarDropDownProps) {
  const { activeDropDown, aboveDropDownIsOpen, filterName, planList, setFunc } =
    props;
  const router = useRouter();

  const onClickListItem = useCallback((state: string, id: string) => {
    if (state === 'planning') router.push(`/plan/${id}`);
    if (state === 'traveling') router.push(`/plan/${id}`);
    if (state === 'recording') router.push(`/addPhoto/${id}`);
    if (state === 'end') router.push(`/ending/${id}`);
  }, []);

  const onClickMoreBtn = useCallback(() => {
    // setSelectedMenu(filter);
    setFunc(false);
    router.push('/main');
  }, []);

  return (
    <ul
      style={{ overflow: aboveDropDownIsOpen ? 'visible' : '' }}
      className={` flex flex-col md:w-[200px] sm:w-[285px] ${
        aboveDropDownIsOpen
          ? ' fixed flex-center ml-[68px] mt-[-40px] w-[190px] border border-gray_light_3 rounded-lg  bg-white'
          : 'items-end ml-[22px]'
      } `}
    >
      {activeDropDown &&
        planList.length > 0 &&
        planList.slice(0, 3).map((plan) => (
          <li
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              onClickListItem(plan.plan_state, plan.id);
            }}
            style={{ overflow: aboveDropDownIsOpen ? 'visible' : '' }}
            className="flex  p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer 
              md:w-[175px] md:my-[5px]
              sm:w-[234px] sm:mt-[5px]
              "
            key={uuid()}
          >
            <p
              className={`text-[13px]   ${
                aboveDropDownIsOpen ? '' : 'md:max-w-[100px] truncate'
              }`}
            >
              {plan.title}
            </p>
            {!aboveDropDownIsOpen && (
              <span className="text-[13px] ml-[4px]">
                {/* ({changeSideBarFormat(plan.dates[0])}) */}
              </span>
            )}
          </li>
        ))}

      {activeDropDown && planList.length > 3 && (
        <li
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={onClickMoreBtn}
          style={{ overflow: aboveDropDownIsOpen ? 'visible' : '' }}
          className="md:w-[175px] sm:w-[234px] mb-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray text-center hover:text-gray_dark_2 cursor-pointer "
        >
          <p className="text-[13px]">+ 더보기</p>
        </li>
      )}

      {activeDropDown && planList.length === 0 && (
        <li
          className="my-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer 
            md:w-[175px]
            sm:w-[234px]
            "
        >
          <p className="text-[13px]">{filterName}이 없습니다</p>
        </li>
      )}
    </ul>
  );
}
