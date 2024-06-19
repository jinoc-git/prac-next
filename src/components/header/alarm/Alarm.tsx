'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import useAlarm from '@/hooks/useAlarm';

import AlarmImage from './alarmImage/AlarmImage';

interface Props {}

const Alarm = ({}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const { alarms, handleConfirmAlarm, hasNewAlarm } = useAlarm();

  const handleToggleDropDownMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickAlarmList = React.useCallback(async (alarmId: string, planId: string) => {
    await handleConfirmAlarm(alarmId);
    setIsOpen(false);
    router.push(`/plan/${planId}`);
  }, []);

  return (
    <div className=" pr-6 h-6">
      <button
        type="button"
        onBlur={() => setIsOpen(false)}
        onClick={handleToggleDropDownMenu}
        className=" "
      >
        <AlarmImage hasNew={hasNewAlarm} />
      </button>
      {isOpen && (
        <ul
          className={`alarm-drop-down fixed top-10 right-6 w-[200px] max-h-[140px] bg-white rounded-lg 
          ${
            alarms && alarms.length > 5
              ? 'overflow-y-scroll scrollbar-custom overscroll-y-contain'
              : ''
          }
        `}
        >
          {alarms?.map(({ id, from_nickname, plan_title, invite_planId }) => (
            <li
              key={uuid()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onClickAlarmList(id, invite_planId)}
              className="w-full h-7 p-1 text-sm truncate hover:bg-slate-200 cursor-pointer"
            >
              {from_nickname}님이 {plan_title}에 초대했습니다.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alarm;
