import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Database } from '@/types/supabase';
// authloading페이지에서 session이 null 이라 아무것도 되지 않음
export default async function AuthLoading() {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (session) {
    const {
      id,
      email,
      user_metadata: { name: nickname },
    } = session.user;

    const { data: check } = await supabaseServerClient.from('users').select('id').eq('id', id);
    if (check && check.length === 0) {
      const user = {
        id,
        email: email as string,
        nickname,
      };

      await supabaseServerClient.from('users').insert(user);
    }

    redirect('/main');
  }

  // setVisibilitySideBar(true);

  return null;
}
