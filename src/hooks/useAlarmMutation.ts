import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserUnConfirmedAlarm } from '@/api/alarm';
import { useAuthStoreState } from '@/store/authStore';

const useAlarmMutation = () => {
  const user = useAuthStoreState();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: getUserUnConfirmedAlarm,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userAlaram', user?.id] });
    },
    onError: () => {
      toast.error('새로운 알림 추가 오류');
    },
  });

  return { alarmMutate: mutate };
};

export default useAlarmMutation;
