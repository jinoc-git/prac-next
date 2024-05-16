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
    onMutate: async (newBookMark: InsertBookMarkType) => {
      await queryClient.cancelQueries({ queryKey: ['book_mark'] });

      const prevData = queryClient.getQueryData<BookMarkType[]>(['book_mark', user?.id]);

      if (prevData) queryClient.setQueryData(['book_mark', user?.id], [...prevData, newBookMark]);
      else queryClient.setQueryData(['book_mark', user?.id], [newBookMark]);

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('북마크 추가 오류');
      queryClient.setQueryData(['book_mark', user?.id], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['book_mark'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBookMark,
    onMutate: async (bookMarkId: string) => {
      await queryClient.cancelQueries({ queryKey: ['book_mark'] });

      const prevData = queryClient.getQueryData<BookMarkType[]>(['book_mark', user?.id]);

      if (prevData) {
        const newBookMarkList = prevData.filter((item) => item.id !== bookMarkId);
        queryClient.setQueryData(['book_mark', user?.id], newBookMarkList);
      }

      return { prevData };
    },
    onError: (err, _, context) => {
      toast.error('북마크 삭제 오류');
      queryClient.setQueryData(['book_mark', user?.id], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['book_mark'],
      });
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
