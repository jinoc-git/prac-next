import { notFound } from 'next/navigation';

import { getAllPinsByPlanFromServer, getPlanByIdFromServer } from '@/api/serverAction';

import MemoryPhotoAndSave from './memoryPhoto/MemoryPhotoAndSave';
import PlanInfo from '../common/planInfo/PlanInfo';

interface Props {
  params: { planId: string };
}

const AddPhotoContent = async ({ params }: Props) => {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  if (plan === null || plan.plan_state !== 'recording') notFound();

  const allPins = await getAllPinsByPlanFromServer(plan);

  return (
    <>
      <PlanInfo plan={plan} allPins={allPins} />
      <MemoryPhotoAndSave plan={plan} allPins={allPins} />
    </>
  );
};

export default AddPhotoContent;
