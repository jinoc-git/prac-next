import { useEffect, useState } from 'react';

import { useDateStoreState } from '@/store/dateStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Args {
  status: PlanStatus;
  planId: string;
}

const useChangePlanStatus = ({ status, planId }: Args) => {
  const { dates } = useDateStoreState();
  const { modifyState } = useModifyPlanStoreState();

  const [isPossibleStart, setIsPossibleStart] = useState<boolean>(false);
  const [isPossibleEnd, setIsPossibleEnd] = useState<boolean>(false);

  const planningText = isPossibleStart
    ? modifyState === 'modify'
      ? '상단의 저장 버튼을 눌러주세요.'
      : '여행을 떠날 준비가 되셨나요?'
    : '아직 시작일이 되지 않았습니다!';
  const etcText = isPossibleEnd
    ? modifyState === 'modify'
      ? '상단의 저장 버튼을 눌러주세요.'
      : '여행 일정을 마치셨나요?'
    : '아직 종료일이 되지 않았습니다!';

  const planningDisabled = !isPossibleStart || modifyState === 'modify';
  const etcDisabled = !isPossibleEnd || modifyState === 'modify';

  const leftText = status === 'planning' ? planningText : etcText;
  const disabled = status === 'planning' ? planningDisabled : etcDisabled;

  useEffect(() => {
    if (dates[0]) {
      const today = new Date();
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[dates.length - 1]);

      if (today >= startDate) setIsPossibleStart(true);
      else setIsPossibleStart(false);

      if (today >= endDate) setIsPossibleEnd(true);
      else setIsPossibleEnd(false);
    }
  }, [dates]);

  return { leftText, disabled };
};

export default useChangePlanStatus;
