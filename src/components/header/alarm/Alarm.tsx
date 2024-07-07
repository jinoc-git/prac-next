'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { usePathname, useRouter } from 'next/navigation';

import { getTargetUserNotificationToken } from '@/api/notification';
import { getNotificationToken } from '@/firebase/firebase';
import useAlarm from '@/hooks/useAlarm';
import useConfirm from '@/hooks/useConfirm';

import AlarmImage from './alarmImage/AlarmImage';

interface Props {
  userId: string | undefined;
}

const Alarm = ({ userId }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { alarms, handleConfirmAlarm, hasNewAlarm } = useAlarm();
  const confirm = useConfirm();

  const handleToggleDropDownMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickAlarmList = React.useCallback(async (alarmId: string, planId: string) => {
    await handleConfirmAlarm(alarmId);
    setIsOpen(false);
    router.push(`/plan/${planId}`);
  }, []);

  React.useEffect(() => {
    // const isApp = () => {
    //   return window.matchMedia('(display-mode: standalone)').matches;
    // };

    const showNotificationPermission = pathname === '/' || pathname === '/main';
    if (showNotificationPermission) {
      const confirmPushNotification = async () => {
        if (!userId) return;

        const hasToken = await getTargetUserNotificationToken(userId);
        if (!hasToken) {
          const confTitle = '푸시 알림 동의';
          const confDesc = '오프라인 푸시 알림 미동의시 서비스 이용이 어렵습니다.';
          const confFunc = async () => {
            const res = await Notification.requestPermission();

            if (res === 'granted') await getNotificationToken(userId);
            else toast.warning('푸시 알림 미동의 시 서비스 이용이 어렵습니다.');
          };

          confirm.default(confTitle, confDesc, confFunc);
        }
      };

      confirmPushNotification();
    }
  }, [userId, pathname]);

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
          className={`alarm-drop-down fixed sm:top-16 md:top-14 right-6 w-[240px] max-h-[140px] border border-white bg-navy rounded-lg 
          ${
            alarms && alarms.length > 5
              ? 'overflow-y-scroll scrollbar-custom overscroll-y-contain'
              : ''
          }
        `}
        >
          {alarms?.map(({ id, from_nickname, plan_title, invite_planId }) => (
            <li
              key={id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onClickAlarmList(id, invite_planId)}
              className="w-full h-7 py-1 px-2 text-white text-center text-sm truncate hover:bg-navy_light_3 cursor-pointer"
            >
              {from_nickname}님이 {plan_title}에 초대했습니다.
            </li>
          ))}
          {alarms?.length === 0 && (
            <li className="w-full h-7 py-1 px-2 text-white text-center text-sm ">
              새로운 알림이 없습니다.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Alarm;
