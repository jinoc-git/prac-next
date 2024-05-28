import { useMutation, useQueryClient } from '@tanstack/react-query';

const useQuitPlanMutation = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const quitPlanMutation = useMutation({
    // mutationFn:
  });

  return quitPlanMutation;
};

export default useQuitPlanMutation;
