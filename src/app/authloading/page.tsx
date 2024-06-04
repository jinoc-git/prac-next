'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { checkGoogleUser } from '@/api/auth';
import Loading from '@/components/common/loading/Loading';

export default function AuthLoading() {
  const router = useRouter();

  React.useEffect(() => {
    const check = async () => {
      await checkGoogleUser();
      router.replace('/main');
      router.refresh();
    };

    check();
  }, []);

  return <Loading full={true} />;
}
