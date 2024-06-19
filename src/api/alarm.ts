import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { AlarmCallbackFunc } from '@/types/aboutAlarm.type';
import type { Database, InsertInviteAlarmType } from '@/types/supabase';

const supabaseClientClient = createClientComponentClient<Database>();

export const addinviteAlarm = async (data: InsertInviteAlarmType) => {
  const hasAlarm = await getUserUnConfirmedAlarm(data);
  if (hasAlarm) return;

  const { error } = await supabaseClientClient.from('invite_alarm').insert(data);

  if (error) throw new Error('알림 추가 오류');
};

export const addInviteAlarmList = async (datas: InsertInviteAlarmType[]) => {
  const { error } = await supabaseClientClient.from('invite_alarm').insert(datas);

  if (error) throw new Error('알림 리스트 추가 오류');
};

export const getUserUnConfirmedAlarm = async (data: InsertInviteAlarmType) => {
  const { data: hasAlarm, error } = await supabaseClientClient
    .from('invite_alarm')
    .select()
    .eq('invite_to', data.invite_to)
    .eq('invite_from', data.invite_from)
    .eq('invite_planId', data.invite_planId)
    .eq('isChecked', false)
    .single();

  if (error) throw new Error('확인하지 않은 알람 갖고오기 오류');

  return !!hasAlarm;
};

export const getUserUnConfirmedAlarmList = async (userId: string | undefined) => {
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
