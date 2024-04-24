'use client';

import React from 'react';

import { useConfirmStoreState } from '@/store/confirmStore';

import ConfirmModal from './confirmModal/ConfirmModal';

const Confirm = () => {
  const isOpen = useConfirmStoreState().isOpen;

  return isOpen && <ConfirmModal />;
};

export default Confirm;
