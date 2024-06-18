import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { AlarmCallbackFunc } from '@/types/aboutAlarm.type';
import type { Database } from '@/types/supabase';

const supabaseClientClient = createClientComponentClient<Database>();

export const addinviteAlarm = async () => {
  await supabaseClientClient.from('invite_alarm').insert({
    invite_from: '47f2dc43-c08f-4d96-b811-d4c7dec7de28',
    invite_to: '89a939d2-56a4-4b08-85a6-29bb18f8012c',
    invite_planId: '35c3343b-82ab-4933-992f-989ced991ca0',
    isChecked: false,
  });

  console.log('add');
};

export const getUserUnConfirmedArlarm = async () => {};

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
