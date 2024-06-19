import React from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  addinviteAlarm,
  confirmAlarm,
  getUserUnConfirmedAlarm,
  userAlarmListener,
} from '@/api/alarm';
import { useAuthStoreState } from '@/store/authStore';

import useAlarmMutation from './useAlarmMutation';

import type { AlarmCallbackFuncArgs } from '@/types/aboutAlarm.type';
import type { InsertInviteAlarmType } from '@/types/supabase';

// const mockFrom = '47f2dc43-c08f-4d96-b811-d4c7dec7de28';
// const mockTo = '89a939d2-56a4-4b08-85a6-29bb18f8012c';
// const mockPlan = '35c3343b-82ab-4933-992f-989ced991ca0';

const useAlarm = () => {
  const [hasNewAlarm, setHasNewAlarm] = React.useState<boolean>(false);

  const user = useAuthStoreState();
  const { alarmMutate } = useAlarmMutation();

  const { data: alarms } = useQuery({
    queryFn: async () => await getUserUnConfirmedAlarm(user?.id),
    queryKey: ['userAlaram', user?.id],
    enabled: user !== null,
  });

  const handleAlarmCallback = (payload: AlarmCallbackFuncArgs) => {
    console.log(payload);
    setHasNewAlarm(true);
    alarmMutate(user?.id);
  };

  const add = async (data: InsertInviteAlarmType) => {
    await addinviteAlarm(data);
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
