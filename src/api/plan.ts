import { supabase } from './auth';

import type { PlanType } from '@/types/supabase';

export const getPlansWithBookmarks = async (
  userId: string,
): Promise<PlanType[] | []> => {
  const { data: bookMarkData, error: bookMarkError } = await supabase
    .from('book_mark')
    .select('plan_id')
    .eq('user_id', userId);

  if (bookMarkError !== null) {
    console.error('book_mark 데이터 불러오기 오류', bookMarkError);
    throw new Error('book_mark 데이터 불러오기 오류');
  }

  if (bookMarkData === null || bookMarkData.length === 0) {
    return [];
  }

  const planIds = bookMarkData.map((item) => item.plan_id);

  const { data: bookMarkPlanData, error: plansError } = await supabase
    .from('plans')
    .select()
    .eq('isDeleted', false)
    .in('id', planIds);

  if (plansError !== null) {
    console.error('plans 데이터 불러오기 오류', plansError);
    throw new Error('plans 데이터 불러오기 오류');
  }

  return bookMarkPlanData;
};
