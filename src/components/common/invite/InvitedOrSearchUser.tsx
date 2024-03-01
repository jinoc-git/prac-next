'use client';

import React from 'react';

import type { UserType } from '@/types/supabase';

interface InvitedOrSearchUserProps {
  person: UserType;
  idx: number;
  handleInvite?: (user: UserType) => Promise<void>;
  deleteUser?: (idx: number) => void;
}

export default function InvitedOrSearchUser(props: InvitedOrSearchUserProps) {
  const { person, idx, handleInvite, deleteUser } = props;

  return (
    <div>
      <div></div>
    </div>
  );
}
