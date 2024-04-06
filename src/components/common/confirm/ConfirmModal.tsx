'use client';

import React from 'react';

import { confirmStore } from '@/store/confirmStore';

import ConfirmModalLayout from '../layout/ConfirmModalLayout';

const ConfirmModal = () => {
  const { title, desc, func, closeConfirm, buttonText } = confirmStore();

  return (
    <ConfirmModalLayout>
      <div>ConfirmModal</div>
    </ConfirmModalLayout>
  );
};

export default ConfirmModal;
