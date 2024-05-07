import { supabaseClientClient } from './auth';

import type {
  InsertPlanType,
  PinContentsType,
  PinInsertType,
  PinType,
  PinUpdateType,
  PlanType,
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

export const getAllPinsByPlan = async (plan: PlanType) => {
  const { data, error } = await supabaseClientClient
    .from('pins')
    .select()
    .eq('plan_id', plan.id)
    .in('date', plan.dates)
    .order('date', { ascending: true });

  if (error !== null) throw new Error('핀 가져오기 에러발생');

  return data;
};

export const addPin = async (pin: PinInsertType) => {
  const { error } = await supabaseClientClient.from('pins').insert(pin);

  if (error) throw new Error(error.message);
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

export const updatePin = async (pin: PinUpdateType) => {
  const { data, error } = await supabaseClientClient
    .from('pins')
    .update(pin)
    .match({ id: pin.id, plan_id: pin.plan_id, date: pin.date });

  if (error) throw new Error('핀 업데이트 오류');
};

export const deletePin = async (id: string) => {
  const { error } = await supabaseClientClient
    .from('pins')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const updatePins = async (
  originPins: PinType[],
  updatedPlan: InsertPlanType,
  pins: PinContentsType[][],
) => {
  const beforeDatesLen = originPins.length; // 7
  const afterDatesLen = updatedPlan.dates.length; // 4
  const isIncreaseDate = beforeDatesLen < afterDatesLen;

  for (let i = 0; i < (isIncreaseDate ? afterDatesLen : beforeDatesLen); i++) {
    const isDecreaseDate = afterDatesLen - 1 < i;
    if (isDecreaseDate) {
      await deletePin(originPins[i].id);
      continue;
    }

    if (originPins[i]) {
      const pin: PinUpdateType = {
        id: originPins[i].id,
        plan_id: updatedPlan.id,
        contents: pins[i],
        date: updatedPlan.dates[i],
      };

      await updatePin(pin);
    } else {
      const pin: PinInsertType = {
        plan_id: updatedPlan.id,
        contents: pins[i],
        date: updatedPlan.dates[i],
      };

      await addPin(pin);
    }
  }
};
