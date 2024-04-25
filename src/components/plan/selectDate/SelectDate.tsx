'use client';

import React, { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { addNewDateEmptyPins } from '@/api/pins';
import { updateDatePlan } from '@/api/plan';
import useDatePicker from '@/hooks/useDatePicker';
import { useDateStoreActions } from '@/store/dateStore';
import { useModifyPlanStoreActions } from '@/store/modifyPlanStore';
import { getDatesArrFromStartEnd } from '@/utils/aboutDay';

import Calendar from '../../common/calendar/Calendar';

import type { PinInsertType } from '@/types/supabase';

interface Props {
  state: 'addPlan' | 'modify';
  planDatesData: string[];
}

export default function SelectDate(props: Props) {
  const { state, planDatesData } = props;

  const { planId } = useParams<{ planId: string }>();
  const { setRequiredDates } = useModifyPlanStoreActions();
  const { setDates } = useDateStoreActions();

  const initStartDate = new Date(planDatesData?.[0] as string);
  const initEdDate = new Date(
    planDatesData?.[planDatesData.length - 1] as string,
  );

  const { startDate, endDate, handleStartDate, handleEndDate } = useDatePicker({
    state,
    initStartDate,
    initEdDate,
  });

  const today = new Date();

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

  useEffect(() => {
    if (startDate && endDate) {
      const dates = getDatesArrFromStartEnd(startDate, endDate);
      setDates(dates);

      const newDates = dates.filter((date) => !planDatesData.includes(date));
      if (newDates.length !== 0 && state !== 'addPlan') {
        newDates.forEach(async (date) => {
          const newEmptyPins: PinInsertType = {
            plan_id: planId,
            contents: [],
            date,
          };

          await addNewDateEmptyPins(newEmptyPins);
        });
      }
      // if (state !== 'addPlan') updatePlanDate([planId, dates]);
    }
  }, [startDate, endDate]);

  return (
    <Calendar
      today={today}
      startDate={startDate}
      endDate={endDate}
      handleStartDate={handleStartDate}
      handleEndDate={handleEndDate}
    />
  );
}
