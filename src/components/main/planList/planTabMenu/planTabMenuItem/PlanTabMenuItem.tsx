import React from 'react';

import { useTabMenuStoreActions, useTabMenuStoreState } from '@/store/tabMenuStore';

interface Props {
  name: 'bookMark' | 'traveling' | 'planning' | 'end';
  planCount: number;
}

export default function PlanTabMenuItem(props: Props) {
  const { name, planCount } = props;

  const selectedMenu = useTabMenuStoreState();
  const { setSelectedMenu } = useTabMenuStoreActions();

  const menuName = {
    bookMark: '즐겨찾기',
    traveling: '여행 중',
    planning: '예정된 여행',
    end: '다녀온 여행',
  } as const;

  return (
    <li>
      <p
        className={`cursor-pointer text-white hover:text-yellow_light_2 normal-transition
        sm:text-[11px]
        md:text-[16px]
      ${name === selectedMenu ? 'text-yellow_light_2 font-SemiBold' : 'text-white'}`}
        onClick={() => {
          setSelectedMenu(name);
        }}
      >
        {menuName[name]} ({planCount})
      </p>
    </li>
  );
}
