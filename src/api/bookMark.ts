import { supabaseClientClient } from './auth';

import type { InsertBookMarkType } from '@/types/supabase';

export const getBookMarkDataByUserId = async (userId: string | undefined) => {
  if (userId === undefined) return;

  const { data, error } = await supabaseClientClient
    .from('book_mark')
    .select('*')
    .eq('user_id', userId);
  if (error !== null) {
    throw new Error('getBookMark오류발생');
  }
  return data;
};

export const addBookMark = async (newBookMark: InsertBookMarkType) => {
  const { plan_id: planId, user_id: userId } = newBookMark;
  const { error } = await supabaseClientClient.from('book_mark').insert({
    plan_id: planId,
    user_id: userId,
  });
  if (error !== null) {
    throw new Error('addBookMark오류발생');
  }
};

export const deleteBookMark = async (id: string) => {
  const { error } = await supabaseClientClient
    .from('book_mark')
    .delete()
    .eq('id', id);

  if (error !== null) {
    throw new Error('오류발생');
  }
};
