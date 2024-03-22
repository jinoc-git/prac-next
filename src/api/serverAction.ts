import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/types/supabase';

const supabaseServerClient = createServerActionClient<Database>({ cookies });

export const getSessionFromServer = async () => {
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  return session;
};
