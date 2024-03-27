'use client';

import React, { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getAllPinsDate, newDatePin } from '@/api/pins';
import { updateDatePlan } from '@/api/plan';
import { dateStore } from '@/store/dateStore';
import { modifyPlanStore } from '@/store/modifyPlanStore';

import Calendar from '../../common/calendar/Calendar';

import type { PinInsertType } from '@/types/supabase';

interface AddPlanDateProps {
  state?: 'addPlan';
  planDatesData?: string[];
}

export default function AddPlanDate(props: AddPlanDateProps) {
  const { state, planDatesData } = props;

  const { planId } = useParams<{ planId: string }>();
  const setRequiredDates = modifyPlanStore((state) => state.setRequiredDates);
  const setDates = dateStore((state) => state.setDates);

  const planStartDate = new Date(planDatesData?.[0] as string);
  const planEndDate = new Date(
    planDatesData?.[planDatesData.length - 1] as string,
  );

  let pinDatesData: string[] = [];

  const { data } = useQuery({
    queryKey: ['pinDate', planId],
    queryFn: async () => {
      if (state !== 'addPlan' && planId) {
        const res = await getAllPinsDate(planId);
        return res;
      } else return null;
    },
  });

  if (data) pinDatesData = data;

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

  const allPlanDates = (startDate: Date, endDate: Date) => {
    const dates: string[] = [];
    const koreaOffset = 9 * 60 * 60 * 1000;
    const currentDate = new Date(startDate.getTime());
    const lastDate = new Date(endDate.getTime());

    while (currentDate < lastDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    dates.push(currentDate.toISOString().slice(0, 10)); // 마지막 날짜도 포함시키기 위하여

    setDates(dates);

    return dates;
  };

  const queryClient = useQueryClient();
  const { mutate: updatePlanDate } = useMutation({
    mutationFn: async ([planId, dates]: [string, string[]]) => {
      await updateDatePlan(planId, dates);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['pinDate', planId] });
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  useEffect(() => {
    if (startDate && endDate) {
      const dates = allPlanDates(startDate, endDate);
      const newDates = dates.filter((date) => !pinDatesData.includes(date));
      if (newDates.length !== 0 && state !== 'addPlan') {
        newDates.forEach(async (date) => {
          const newPin: PinInsertType = {
            plan_id: planId,
            contents: [],
            date,
          };

          await newDatePin(newPin);
        });
      }
      if (state !== 'addPlan') updatePlanDate([planId, dates]);
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
