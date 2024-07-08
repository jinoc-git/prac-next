import axios from 'axios';

import { createClientFromClient } from '@/utils/supabase/client';

import type { Message } from 'firebase-admin/messaging';

const supabaseClientClient = createClientFromClient();

export const savaNotificationToken = async (userId: string, token: string) => {
  const { error } = await supabaseClientClient
    .from('users')
    .update({ push_notification: token })
    .eq('id', userId);

  if (error) throw new Error('푸시 알림 토큰 저장 오류');
};

export const getTargetUserNotificationToken = async (userId: string) => {
  const { data, error } = await supabaseClientClient
    .from('users')
    .select('push_notification')
    .eq('id', userId)
    .single();

  if (error) throw new Error('유저 토큰 불러오기 오류');

  if (data.push_notification) return data.push_notification;
  else return false;
};

export const reqSendPush = async (args: Message) => {
  console.log('req send push', args);
  await axios.post(window?.location?.origin + '/api/push', args);
};
