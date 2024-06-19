import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { AlarmCallbackFunc } from '@/types/aboutAlarm.type';
import type { Database, InsertInviteAlarmType } from '@/types/supabase';

const supabaseClientClient = createClientComponentClient<Database>();

export const addinviteAlarm = async (data: InsertInviteAlarmType) => {
  await supabaseClientClient.from('invite_alarm').insert({
    invite_from: data.invite_from,
    invite_to: data.invite_to,
    invite_planId: data.invite_planId,
    from_nickname: data.from_nickname,
    plan_title: data.plan_title,
  });

  console.log('add');
};

export const getUserUnConfirmedAlarm = async (userId: string | undefined) => {
  if (!userId) return null;

  const { data, error } = await supabaseClientClient
    .from('invite_alarm')
    .select()
    .eq('invite_to', userId)
    .eq('isChecked', false)
    .order('created_at', { ascending: true });

  if (error) throw new Error('여행 초대 알림 데이터 불러오기 오류');

  return data;
};

export const confirmAlarm = async (alarmId: string) => {
  const { error } = await supabaseClientClient
    .from('invite_alarm')
    .update({ isChecked: true })
    .eq('id', alarmId)
    .select();

  if (error) throw new Error('알림 확인 오류');
};

export const userAlarmListener = (userId: string, callback: AlarmCallbackFunc) => {
  supabaseClientClient
    .channel('invite_alarm')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'invite_alarm',
        filter: `invite_to=in.(${[userId]})`,
      },
      callback,
    )
    .subscribe();
};
