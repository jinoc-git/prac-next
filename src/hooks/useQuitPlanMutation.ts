import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { quitPlan } from '@/api/plan';

import type { UserAndPlanList } from '@/types/aboutPlan.type';

const useQuitPlanMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: quitPlanMutation } = useMutation({
    mutationFn: quitPlan,
    onMutate: async ({ userId, planId }) => {
      await queryClient.cancelQueries({ queryKey: ['plan_mates'] });

      const prevData = queryClient.getQueryData<UserAndPlanList>(['plan_mates', userId]);

      if (prevData) {
        const newData: UserAndPlanList = {
          planDataList: prevData.planDataList.filter((item) => item.id !== planId),
          planIdAndMatesInfoList: prevData.planIdAndMatesInfoList.filter(
            (item) => !Object.keys(item).includes(userId),
          ),
        };

        queryClient.setQueryData(['plan_mates', userId], newData);
      }

      return { prevData };
    },
    onError: (err, { userId }, context) => {
      toast.error('여행 나가기 오류');
      queryClient.setQueryData(['plan_mates', userId], context?.prevData);
    },
    onSettled: (_, err, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['plan_mates', userId] });
      queryClient.invalidateQueries({ queryKey: ['book_mark', userId] });
    },
    onSuccess: () => {
      toast.success('여행 나가기 성공');
    },
  });

  return quitPlanMutation;
};

export default useQuitPlanMutation;
