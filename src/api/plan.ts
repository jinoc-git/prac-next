import { supabaseClientClient } from './auth';
import { addPins } from './pins';
import { addNewPlanMates } from './planMate';

import type { AddPlanObj } from '@/types/aboutPlan.type';
import type { PlanType } from '@/types/supabase';

export const getPlanList = async (planIds: string[]) => {
  const { data: plans, error } = await supabaseClientClient
    .from('plans')
    .select()
    .eq('isDeleted', false)
    .in('id', planIds);

  return plans;
};

export const getMatesByUserIdList = async (matesUserId: string[]) => {
  const { data, error } = await supabaseClientClient
    .from('users')
    .select()
    .in('id', matesUserId);

  if (error != null) {
    console.log('에러발생', matesUserId);
    throw new Error('getMatesByUserIds 에러발생');
  }
  return data;
};

export const getPlansByUserIdList = async (userIds: string[]) => {
  const { data, error } = await supabaseClientClient
    .from('plans')
    .select()
    .eq('isDeleted', false)
    .in('users_id', userIds);

  if (error != null) {
    console.log('에러 발생', error);
    throw new Error('getPlansByUserIds 에러발생');
  }

  return data;
};

export const getPlansWithBookmarks = async (
  userId: string,
): Promise<PlanType[] | []> => {
  const { data: bookMarkData, error: bookMarkError } =
    await supabaseClientClient
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

  const { data: bookMarkPlanData, error: plansError } =
    await supabaseClientClient
      .from('plans')
      .select()
      .eq('isDeleted', false)
      .in('id', planIds);

  if (plansError !== null) {
    throw new Error('plans 데이터 불러오기 오류');
  }

  return bookMarkPlanData;
};

export const getPlanListAndMateList = async (userId: string | undefined) => {
  if (userId === undefined) return;

  const { data: matesData, error: matesError } = await supabaseClientClient
    .from('plan_mates')
    .select()
    .contains('users_id', [userId]);

  if (matesError != null) {
    throw new Error('getPlansWithMates 에러 1발생');
  }

  const planIdList = matesData.map((data) => data.id).flat();
  const userIdList = matesData.map((data) => data.users_id);

  if (userIdList.length === 0) {
    return {
      planDataList: [],
      usersDataList: [],
    };
  }

  const planDataList = (await getPlanList(planIdList)) ?? [];

  const usersDataList = [];
  for (let i = 0; i < userIdList.length; i++) {
    const users = await getMatesByUserIdList(userIdList[i]);

    const userList = { [planIdList[i]]: users };
    usersDataList.push(userList);
  }

  return {
    planDataList,
    usersDataList,
  };
};

export const updateDatePlan = async (planId: string, dates: string[]) => {
  const { error } = await supabaseClientClient
    .from('plans')
    .update({ dates })
    .eq('id', planId);

  if (error !== null) {
    throw new Error('여행 날짜 업데이트 오류');
  }
};

export const addPlan = async (addPlanObj: AddPlanObj) => {
  const { newPlan, pins, invitedUser } = addPlanObj;

  const { data, error } = await supabaseClientClient
    .from('plans')
    .insert(newPlan);

  if (error) throw new Error(error.message);

  await addPins(newPlan, pins);

  await addNewPlanMates(newPlan.id, invitedUser);

  if (data !== null) {
    return { data };
  }
};
