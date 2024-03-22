import { getUserInfoWithId, supabaseClientClient } from './auth';

import type { UserType } from '@/types/supabase';

export const findUsers = async (input: string) => {
  const { data: nickname, error } = await supabaseClientClient
    .from('users')
    .select()
    .like('nickname', `%${input}%`);
  const { data: email, error: emailerror } = await supabaseClientClient
    .from('users')
    .select()
    .like('email', `%${input}%`);

  if (error != null || emailerror != null) {
    console.log('에러발생');
  }

  return { nickname, email };
};

export const getMates = async (planId: string) => {
  const { data: matesId, error } = await supabaseClientClient
    .from('plan_mates')
    .select('users_id')
    .eq('id', planId);

  if (error != null) {
    console.log(error);
  }

  const matesInfo: UserType[] = [];

  if (matesId !== null) {
    const matesIdArr = matesId[0].users_id;
    for (let i = 0; i < matesIdArr.length; i++) {
      const mateUserData = await getUserInfoWithId(matesIdArr[i]);

      if (mateUserData !== null) matesInfo.push(mateUserData[0]);
    }
  }

  return matesInfo;
};

export const updateMates = async (newMates: string[], planId: string) => {
  const { data, error } = await supabaseClientClient
    .from('plan_mates')
    .update({ users_id: newMates })
    .eq('id', planId)
    .select();

  if (error != null) {
    console.log('친구 초대 오류 발생', error);
  }
  console.log('planMates update api', data);
};
