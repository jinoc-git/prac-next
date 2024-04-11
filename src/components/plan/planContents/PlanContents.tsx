'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addPlanSchema } from '@/schema/planSchema';
import { modifyPlanStore } from '@/store/modifyPlanStore';
import { addCommas } from '@/utils/numberFormat';

import PostPlanForm from '../../common/form/PostPlanForm';
import PlanTopBar from '../../common/planTopBar/PlanTopBar';

import type { PlanType } from '@/types/supabase';

export interface PlanContentsInputType {
  title: string;
  totalCost: string;
}

interface Props {
  plan?: PlanType | null;
}

export default function PlanContents({ plan }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { modifyState, setReadOnly, setModify } = modifyPlanStore();
  const resolver = yupResolver(addPlanSchema);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PlanContentsInputType>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  const handleSaveOrModifyBtnClick = () => {
    if (modifyState === 'readOnly') {
      setModify();
      return;
    }
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    setValue('totalCost', addCommas(+val));
  };

  useEffect(() => {
    if (plan) setReadOnly();
    else setModify();
  }, []);

  return (
    <>
      <PlanTopBar
        isModify={modifyState === 'modify'}
        handleSaveOrModifyBtnClick={handleSaveOrModifyBtnClick}
      />
      <PostPlanForm
        formRef={formRef}
        handleSubmit={handleSubmit}
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
    </>
  );
}
