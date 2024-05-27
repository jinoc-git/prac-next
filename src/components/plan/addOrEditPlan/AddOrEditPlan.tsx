'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';

import { getAllPinsByIdAndDates } from '@/api/pins';
import Loading from '@/components/common/loading/Loading';
import { addPlanSchema } from '@/schema/planSchema';
import { useModifyPlanStoreActions, useModifyPlanStoreState } from '@/store/modifyPlanStore';
import { addCommas } from '@/utils/numberFormat';

import PostPlanForm from '../../common/form/PostPlanForm';
import PlanTopBar from '../planTopBar/PlanTopBar';

import type { PlanType } from '@/types/supabase';

export interface PlanContentsInputType {
  title: string;
  totalCost: string;
}

interface Props {
  plan?: PlanType;
}

const AddOrEditPlan = ({ plan }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { modifyState } = useModifyPlanStoreState();
  const { setReadOnly, setModify } = useModifyPlanStoreActions();

  const { data, isLoading } = useQuery({
    queryKey: ['pins', plan?.id],
    queryFn: async () => {
      if (plan) return await getAllPinsByIdAndDates([plan.id, plan.dates]);
      else return undefined;
    },
    enabled: plan !== undefined,
  });

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

  React.useEffect(() => {
    if (plan) setReadOnly();
    else setModify();

    return () => {
      setReadOnly();
    };
  }, []);

  return (
    <>
      <PlanTopBar
        isModify={modifyState === 'modify'}
        handleSaveOrModifyBtnClick={handleSaveOrModifyBtnClick}
      />
      <PostPlanForm
        plan={plan}
        originPins={data}
        readonly={modifyState !== 'modify'}
        formRef={formRef}
        handleSubmit={handleSubmit}
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
      {isLoading && <Loading full={true} />}
    </>
  );
};

export default AddOrEditPlan;
