import React from 'react';

import dynamic from 'next/dynamic';

const DynamicSignupForm = dynamic(
  () => import('@/components/common/form/SignupForm'),
  {
    ssr: false,
  },
);

export default function Signup() {
  return <DynamicSignupForm />;
}
