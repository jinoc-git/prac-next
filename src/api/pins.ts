import { supabaseClientClient } from './auth';

import type { PinInsertType } from '@/types/supabase';

export const newDatePin = async (newPin: PinInsertType) => {
  const { error } = await supabaseClientClient.from('pins').insert(newPin);

  if (error !== null) throw new Error('새 핀 추가 오류');
};

export const getAllPinsDate = async (planId: string) => {
  const { data, error } = await supabaseClientClient
    .from('pins')
    .select('date')
    .eq('plan_id', planId);

  if (error !== null) {
    throw new Error('핀 날짜 가져오기 에러발생');
  }
  const res = data.map((item) => item.date);

  return res;
};
