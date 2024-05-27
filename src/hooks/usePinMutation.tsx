import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getAllPinsByIdAndDates } from '@/api/pins';

const usePinMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: pinMutate } = useMutation({
    mutationFn: getAllPinsByIdAndDates,
    onSuccess: async (_, [planId, dates]) => {
      await queryClient.invalidateQueries({ queryKey: ['pins', planId] });
    },
  });

  return { pinMutate };
};

export default usePinMutation;
