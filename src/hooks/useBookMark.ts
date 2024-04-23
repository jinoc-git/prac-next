import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { addBookMark, deleteBookMark } from '@/api/bookMark';

import type { InsertBookMarkType } from '@/types/supabase';

const useBookMark = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['book_mark'],
      });
    },
    onError: () => {
      toast.error('북마크 오류');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['book_mark'],
      });
    },
    onError: () => {
      toast.error('북마크 오류');
    },
  });

  const throttleAddBookMark = _.throttle((newBookMark: InsertBookMarkType) => {
    addMutation.mutate(newBookMark);
  });

  const throttleDeleteBookMark = _.throttle((bookMarkId: string) => {
    deleteMutation.mutate(bookMarkId);
  });

  return { throttleAddBookMark, throttleDeleteBookMark };
};

export default useBookMark;
