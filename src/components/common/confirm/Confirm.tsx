'use client';

import React from 'react';

import { confirmStore } from '@/store/confirmStore';

import ConfirmModal from './confirmModal/ConfirmModal';

const Confirm = () => {
  const isOpen = confirmStore(({ isOpen }) => isOpen);

  return isOpen && <ConfirmModal />;
};

export default Confirm;
