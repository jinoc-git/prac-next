import { supabaseClientClient } from './auth';

import type {
  InsertPlanType,
  PinContentsType,
  PinInsertType,
} from '@/types/supabase';

export const addNewDateEmptyPins = async (newPin: PinInsertType) => {
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

export const getAllPinsByPlanId = async (planId: string) => {
  const { data, error } = await supabaseClientClient
    .from('pins')
    .select()
    .eq('plan_id', planId);

  if (error !== null) throw new Error('핀 가져오기 에러발생');

  return data;
};

export const addPins = async (
  newPlan: InsertPlanType,
  pins: PinContentsType[][],
) => {
  const newPins = [];

  for (let i = 0; i < newPlan.dates.length; i++) {
    const pin = {
      plan_id: newPlan.id,
      contents: pins[i],
      date: newPlan.dates[i],
    };
    newPins.push(pin);
  }

  const { error } = await supabaseClientClient.from('pins').insert(newPins);

  if (error) throw new Error(error.message);
};

export const updatePins = async (
  updatedPlan: InsertPlanType,
  pins: PinContentsType[][],
) => {
  const newPins = [];

  for (let i = 0; i < updatedPlan.dates.length; i++) {
    const pin = {
      plan_id: updatedPlan.id,
      contents: pins[i],
      date: updatedPlan.dates[i],
    };
    newPins.push(pin);
  }

  // const { error } = await supabaseClientClient.from('pins').update(newPins);

  // if (error) throw new Error(error.message);
};
