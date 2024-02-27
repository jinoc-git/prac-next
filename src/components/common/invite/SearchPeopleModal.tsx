'use client';

import React from 'react';

import ModalLayout from '../layout/ModalLayout';

interface SearchPeopleModalProps {
  closeModal: () => void;
  isAnimate: boolean;
}

export default function SearchPeopleModal(props: SearchPeopleModalProps) {
  const { closeModal, isAnimate } = props;

  return (
    <ModalLayout isAnimate={isAnimate}>
      <div></div>
    </ModalLayout>
  );
}
