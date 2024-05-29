'use client';

import React, { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getAllPinsByIdAndDates } from '@/api/pins';
import Loading from '@/components/common/loading/Loading';
import { useModifyPlanStoreActions, useModifyPlanStoreState } from '@/store/modifyPlanStore';

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

  const handleSaveOrModifyBtnClick = () => {
    if (modifyState === 'readOnly') {
      setModify();
      return;
    }
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
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
        setReadOnly={setReadOnly}
        formRef={formRef}
      />
      {isLoading && <Loading full={true} />}
    </>
  );
};

export default AddOrEditPlan;
