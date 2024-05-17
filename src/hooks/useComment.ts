import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment, deleteComment } from '@/api/comment';

import type { CommentsType } from '@/types/supabase';

const useComment = (planId: string) => {
  const queryClient = useQueryClient();

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
    onMutate: async (comment) => {
      await queryClient.cancelQueries({ queryKey: ['commentList', planId] });

      const prevData = queryClient.getQueryData<CommentsType[]>(['commentList', planId]);

      if (prevData) queryClient.setQueryData(['commentList', planId], [...prevData, comment]);
      else queryClient.setQueryData(['commentList', planId], [comment]);

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('댓글 작성에 실패했습니다.');
      queryClient.setQueryData(['commentList', planId], context?.prevData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['commentList', planId] });
    },
  });

  const { mutate: delCommentMutate } = useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['commentList', planId] });

      const prevData = queryClient.getQueryData<CommentsType[]>(['commentList', planId]);

      if (prevData) {
        const newComments = prevData.filter(({ id }) => id !== commentId);
        queryClient.setQueryData(['commentList', planId], newComments);
      }

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('댓글 삭제에 실패했습니다.');
      queryClient.setQueryData(['commentList', planId], context?.prevData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['commentList', planId] });
    },
  });

  return { addCommentMutate, delCommentMutate };
};

export default useComment;
