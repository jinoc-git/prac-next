import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { addBookMark, deleteBookMark } from '@/api/bookMark';
import { useAuthStoreState } from '@/store/authStore';

import type { BookMarkType, InsertBookMarkType } from '@/types/supabase';

const useBookMark = () => {
  const user = useAuthStoreState();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['book_mark'],
      });
    },
    onError: () => {
      toast.error('북마크 추가 오류');
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
      toast.error('북마크 삭제 오류');
    },
  });

  const throttleAddBookMark = _.throttle((newBookMark: InsertBookMarkType) => {
    addMutation.mutate(newBookMark);
  });

  const throttleDeleteBookMark = _.throttle((bookMarkId: string) => {
    deleteMutation.mutate(bookMarkId);
  });

  const handleBookMark = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      bookMarkData: BookMarkType | undefined,
      planId: string,
    ) => {
      e.stopPropagation();

      if (user === null) return;

      if (bookMarkData) {
        throttleDeleteBookMark(bookMarkData.id);
      } else {
        throttleAddBookMark({ plan_id: planId, user_id: user.id });
      }
    },
    [user],
  );

  return handleBookMark;
};

export default useBookMark;
