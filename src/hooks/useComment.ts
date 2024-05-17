import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment, deleteComment } from '@/api/comment';

import type { CommentsType } from '@/types/supabase';

const useComment = (planId: string) => {
  const queryClient = useQueryClient();

  const { mutate: addMutate } = useMutation({
    mutationFn: addComment,
    onMutate: async (comment) => {
      await queryClient.cancelQueries({ queryKey: ['comment', planId] });

      const prevData = queryClient.getQueryData<CommentsType[]>(['comment', planId]);

      if (prevData) queryClient.setQueryData(['comment', planId], [...prevData, comment]);
      else queryClient.setQueryData(['comment', planId], [comment]);

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('댓글 작성에 실패했습니다.');
      queryClient.setQueryData(['comment', planId], context?.prevData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comment', planId] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['comment', planId] });

      const prevData = queryClient.getQueryData<CommentsType[]>(['comment', planId]);

      if (prevData) {
        const newComments = prevData.filter(({ id }) => id !== commentId);
        queryClient.setQueryData(['comment', planId], newComments);
      }

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('댓글 삭제에 실패했습니다.');
      queryClient.setQueryData(['comment', planId], context?.prevData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments', planId] });
    },
  });

  return { addMutate, deleteMutate };
};

export default useComment;
