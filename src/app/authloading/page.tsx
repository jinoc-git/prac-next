'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { insertUser, supabaseClientClient } from '@/api/auth';

export default function AuthLoading() {
  // async 가능할지 확인
  const router = useRouter();

  React.useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabaseClientClient.auth.getSession();
      if (data !== null) {
        if (data.session !== null) {
          const {
            id,
            email,
            user_metadata: { name: nickname },
          } = data.session.user;

          const { data: check } = await supabaseClientClient
            .from('users')
            .select('id')
            .eq('id', id);
          if (check !== null && check.length === 0) {
            const user = {
              id,
              email: email as string,
              nickname,
            };
            await insertUser(user);
          }
        }
      }
      router.push('/main');
    };

    checkUser();
  }, []);
  return <div>AuthLoading</div>;
}
