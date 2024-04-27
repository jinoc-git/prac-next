import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useDateStoreState } from '@/store/dateStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import useConfirm from './useConfirm';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Args {
  status: PlanStatus;
  planId: string;
}

const useChangePlanStatus = ({ status, planId }: Args) => {
  const { dates } = useDateStoreState();
  const { modifyState } = useModifyPlanStoreState();

  const confirm = useConfirm();

  const [isPossibleStart, setIsPossibleStart] = useState<boolean>(false);
  const [isPossibleEnd, setIsPossibleEnd] = useState<boolean>(false);
  const router = useRouter();

  const handleChangePlanStatus = () => {
    if (status === 'planning') {
      const confTitle = '여행 중으로 변경';
      const confDesc =
        '여행 중으로 변경할 경우 다시 계획 중으로 되돌릴 수 없습니다. 변경하시겠습니까?';

      const confFunc = () => {
        // changeStateMutate([planId, 'traveling']);
        // scrollTop();
      };
      confirm.default(confTitle, confDesc, confFunc);
    } else {
      const confTitle = '여행 완료로 변경';
      const confDesc =
        '여행을 완료하시면 더 이상 여행 내용을 수정하실 수 없습니다. 완료하시겠습니까?';
      const confFunc = () => {
        // changeStateMutate([planId, 'recording']);
        router.push(`/addPhoto/${planId}`);
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
  };

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

  return { leftText, disabled, handleChangePlanStatus };
};

export default useChangePlanStatus;
