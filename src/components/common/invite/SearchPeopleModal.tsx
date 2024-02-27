'use client';

import React from 'react';

interface SearchPeopleModalProps {
  closeModal: () => void;
  isAnimate: boolean;
}

export default function SearchPeopleModal(props: SearchPeopleModalProps) {
  const { closeModal, isAnimate } = props;

  return (
    <div>
      <div></div>
    </div>
  );
}
