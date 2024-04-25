'use client';

import React, { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { addNewDateEmptyPins } from '@/api/pins';
import { updateDatePlan } from '@/api/plan';
import { useDateStoreActions } from '@/store/dateStore';
import { useModifyPlanStoreActions } from '@/store/modifyPlanStore';
import { getDatesArrFromStartEnd } from '@/utils/aboutDay';

import Calendar from '../../common/calendar/Calendar';

import type { PinInsertType } from '@/types/supabase';

interface SelectDateProps {
  state?: 'addPlan' | 'modify';
  planDatesData: string[];
}

export default function SelectDate(props: SelectDateProps) {
  const { state, planDatesData } = props;

  const { planId } = useParams<{ planId: string }>();
  const { setRequiredDates } = useModifyPlanStoreActions();
  const { setDates } = useDateStoreActions();

  const planStartDate = new Date(planDatesData?.[0] as string);
  const planEndDate = new Date(
    planDatesData?.[planDatesData.length - 1] as string,
  );

  const today = new Date();

  const [startDate, setStartDate] = useState<Date | null>(
    state === 'addPlan' ? today : planStartDate,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    state === 'addPlan' ? null : planEndDate,
  );

  const startDateChangeHandler = (date: Date | null) => {
    setRequiredDates('start');
    setStartDate(date);
  };
  const endDateChangeHandler = (date: Date | null) => {
    setRequiredDates('end');
    setEndDate(date);
  };

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
      startDateChangeHandler={startDateChangeHandler}
      endDateChangeHandler={endDateChangeHandler}
    />
  );
}
