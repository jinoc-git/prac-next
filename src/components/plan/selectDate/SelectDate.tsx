'use client';

import React from 'react';

import useDatePicker from '@/hooks/useDatePicker';

import Calendar from '../../common/calendar/Calendar';

interface Props {
  state: 'addPlan' | 'modify';
  planDatesData: string[];
}

export default function SelectDate(props: Props) {
  const { state, planDatesData } = props;

  const initStartDate = new Date(planDatesData?.[0] as string);
  const initEdDate = new Date(planDatesData?.[planDatesData.length - 1] as string);

  const { startDate, endDate, handleStartDate, handleEndDate } = useDatePicker({
    state,
    initStartDate,
    initEdDate,
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
