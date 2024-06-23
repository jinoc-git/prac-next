import React from 'react';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import { confirmAlarm, getUserUnConfirmedAlarmList, userAlarmListener } from '@/api/alarm';
import { useAuthStoreState } from '@/store/authStore';

import useAlarmMutation from './useAlarmMutation';

import type { AlarmCallbackFuncArgs } from '@/types/aboutAlarm.type';

const useAlarm = () => {
  const [hasNewAlarm, setHasNewAlarm] = React.useState<boolean>(false);

  const user = useAuthStoreState();
  const { alarmMutate } = useAlarmMutation();

  const { data: alarms } = useQuery({
    queryFn: async () => await getUserUnConfirmedAlarmList(user?.id),
    queryKey: ['userAlaram', user?.id],
    enabled: user !== null,
  });

  const handleAlarmCallback = (payload: AlarmCallbackFuncArgs) => {
    toast.info(`${payload.new.from_nickname}님이 ${payload.new.plan_title}에 초대했습니다.`);
    setHasNewAlarm(true);
    alarmMutate(user?.id);
  };

  const handleConfirmAlarm = async (alarmId: string) => {
    await confirmAlarm(alarmId);
    alarmMutate(user?.id);
  };

  React.useEffect(() => {
    if (user) {
      userAlarmListener(user.id, handleAlarmCallback);
    }
  }, [user]);

  React.useEffect(() => {
    if (alarms?.length === 0) setHasNewAlarm(false);
    else setHasNewAlarm(true);
  }, [alarms]);

  return { alarms, hasNewAlarm, handleConfirmAlarm };
};

export default useAlarm;
