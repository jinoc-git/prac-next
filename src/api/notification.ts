import axios from 'axios';

import { getNotificationToken } from '@/firebase/firebase';
import { is30DaysPast } from '@/utils/aboutDay';
import { createClientFromClient } from '@/utils/supabase/client';

import type { UserTokenData } from '@/types/supabase';
import type { Message } from 'firebase-admin/messaging';

const supabaseClientClient = createClientFromClient();

export const savaNotificationToken = async (userId: string, token: string) => {
  const { error } = await supabaseClientClient
    .from('users')
    .update({ push_notification: { token, update_at: new Date() } })
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

  return data.push_notification;
};

export const reqSendPush = async (args: Message) => {
  await axios.post(window?.location?.origin + '/api/push', args);
};

export const checkTokenTime = async (userId: string, tokenData: UserTokenData) => {
  if (!tokenData) return;

  const { update_at } = tokenData;

  const needNew = is30DaysPast(update_at);
  if (needNew) await getNotificationToken(userId);
};
