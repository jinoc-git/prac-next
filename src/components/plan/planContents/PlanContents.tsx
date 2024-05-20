'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addPlanSchema } from '@/schema/planSchema';
import { useModifyPlanStoreActions, useModifyPlanStoreState } from '@/store/modifyPlanStore';
import { addCommas } from '@/utils/numberFormat';

import PostPlanForm from '../../common/form/PostPlanForm';
import PlanTopBar from '../planTopBar/PlanTopBar';

import type { PinType, PlanType } from '@/types/supabase';

export interface PlanContentsInputType {
  title: string;
  totalCost: string;
}

interface Props {
  plan?: PlanType;
  originPins?: PinType[];
}

export default function PlanContents({ plan, originPins }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { modifyState } = useModifyPlanStoreState();
  const { setReadOnly, setModify } = useModifyPlanStoreActions();

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
      title: plan?.title,
      totalCost: plan?.total_cost,
    },
  });

  const handleSaveOrModifyBtnClick = () => {
    if (modifyState === 'readOnly') {
      setModify();
      return;
    }
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      setReadOnly();
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
        plan={plan}
        originPins={originPins}
        readonly={modifyState !== 'modify'}
        formRef={formRef}
        handleSubmit={handleSubmit}
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
    </>
  );
}
