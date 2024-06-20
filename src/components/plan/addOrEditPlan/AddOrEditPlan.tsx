'use client';

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import { getAllPinsByIdAndDates } from '@/api/pins';
import PostPlanForm from '@/components/common/form/postPlanForm/PostPlanForm';
import Loading from '@/components/common/loading/Loading';
import useAuthority from '@/hooks/useAuthority';
import { useModifyPlanStoreActions, useModifyPlanStoreState } from '@/store/modifyPlanStore';

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
  const hasAuthority = useAuthority();

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
      if (!hasAuthority) {
        toast.error('본인이 속한 여행이 아닙니다.');
        return;
      }
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
