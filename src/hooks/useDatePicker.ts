import { useState } from 'react';

import { useModifyPlanStoreActions } from '@/store/modifyPlanStore';

interface Args {
  state: 'addPlan' | 'modify';
  initStartDate: Date;
  initEdDate: Date;
}

const useDatePicker = ({ state, initStartDate, initEdDate }: Args) => {
  const { setRequiredDates } = useModifyPlanStoreActions();

  const [startDate, setStartDate] = useState<Date | null>(
    state === 'addPlan' ? new Date() : initStartDate,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    state === 'addPlan' ? null : initEdDate,
  );

  const handleStartDate = (date: Date | null) => {
    setRequiredDates('start');
    setStartDate(date);
  };

  const handleEndDate = (date: Date | null) => {
    setRequiredDates('end');
    setEndDate(date);
  };

  return { startDate, endDate, handleStartDate, handleEndDate };
};

export default useDatePicker;
