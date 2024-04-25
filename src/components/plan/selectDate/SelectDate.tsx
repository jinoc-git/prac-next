'use client';

import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { updateDatePlan } from '@/api/plan';
import useDatePicker from '@/hooks/useDatePicker';

import Calendar from '../../common/calendar/Calendar';

interface Props {
  state: 'addPlan' | 'modify';
  planDatesData: string[];
}

export default function SelectDate(props: Props) {
  const { state, planDatesData } = props;

  const { planId } = useParams<{ planId: string }>();

  const initStartDate = new Date(planDatesData?.[0] as string);
  const initEdDate = new Date(
    planDatesData?.[planDatesData.length - 1] as string,
  );

  const { startDate, endDate, handleStartDate, handleEndDate } = useDatePicker({
    state,
    initStartDate,
    initEdDate,
  });

  // mutation 부분 어떻게 할지 고민 (데이터를 서버에서 불러올지 클라이언트에서 불러올지)
  const queryClient = useQueryClient();
  const { mutate: updatePlanDate } = useMutation({
    mutationFn: async ([planId, dates]: [string, string[]]) => {
      await updateDatePlan(planId, dates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pinDate', planId] });
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  return (
    <Calendar
      startDate={startDate}
      endDate={endDate}
      handleStartDate={handleStartDate}
      handleEndDate={handleEndDate}
    />
  );
}
