import React from 'react';

import { useDateStoreActions } from '@/store/dateStore';
import { useModifyPlanStoreActions } from '@/store/modifyPlanStore';
import { getDatesArrFromStartEnd } from '@/utils/aboutDay';

interface Args {
  state: 'addPlan' | 'modify';
  initStartDate: Date;
  initEdDate: Date;
}

const useDatePicker = ({ state, initStartDate, initEdDate }: Args) => {
  const { setRequiredDates } = useModifyPlanStoreActions();
  const { setDates } = useDateStoreActions();

  const [startDate, setStartDate] = React.useState<Date | null>(
    state === 'addPlan' ? new Date() : initStartDate,
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
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

  React.useEffect(() => {
    if (startDate && endDate) {
      const dates = getDatesArrFromStartEnd(startDate, endDate);
      setDates(dates);
    }
  }, [startDate, endDate]);

  return { startDate, endDate, handleStartDate, handleEndDate };
};

export default useDatePicker;
