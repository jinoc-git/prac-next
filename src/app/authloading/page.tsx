'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { insertUser, supabase } from '@/api/auth';

export default function AuthLoading() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data !== null) {
        if (data.session !== null) {
          const {
            id,
            email,
            user_metadata: { name: nickname },
          } = data.session.user;

          const { data: check } = await supabase
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
