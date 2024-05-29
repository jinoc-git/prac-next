import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getPlanListAndMateList } from '@/api/plan';

const useUserInfoMutation = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate: userInfoMutate } = useMutation({
    mutationFn: getPlanListAndMateList,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['plan_mates', userId] });
    },
  });

  return { userInfoMutate };
};

export default useUserInfoMutation;
