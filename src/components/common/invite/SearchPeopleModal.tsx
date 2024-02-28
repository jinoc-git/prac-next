'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { inviteUserStore } from '@/store/inviteUserStore';

import ModalLayout from '../layout/ModalLayout';

interface SearchPeopleModalProps {
  closeModal: () => void;
  isAnimate: boolean;
}

export default function SearchPeopleModal(props: SearchPeopleModalProps) {
  const { closeModal, isAnimate } = props;
  const { invitedUser, inviteUser, setUser, syncInvitedUser } =
    inviteUserStore();
  const planId = useParams();

  return (
    <ModalLayout isAnimate={isAnimate}>
      <div></div>
    </ModalLayout>
  );
}
