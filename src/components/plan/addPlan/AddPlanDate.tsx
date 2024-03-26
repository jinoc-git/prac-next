'use client';

import React, { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { dateStore } from '@/store/dateStore';
import { modifyPlanStore } from '@/store/modifyPlanStore';

import Calendar from '../../common/calendar/Calendar';

interface AddPlanDateProps {
  state?: 'addPlan';
  planDatesData?: string[];
}

export default function AddPlanDate(props: AddPlanDateProps) {
  const { state, planDatesData } = props;

  const { planId } = useParams();
  const setRequiredDates = modifyPlanStore((state) => state.setRequiredDates);
  const setDates = dateStore((state) => state.setDates);

  const planStartDate = new Date(planDatesData?.[0] as string);
  const planEndDate = new Date(
    planDatesData?.[planDatesData.length - 1] as string,
  );

  let pinDatesData: string[] = [];

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

  useEffect(() => {
    if (startDate && endDate) {
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
