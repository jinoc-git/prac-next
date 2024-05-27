import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getEndingPlanFromServer } from '@/api/serverAction';

import Comment from './comment/Comment';
import FinalCost from './finalCost/FinalCost';
import GoToList from './goToList/GoToList';
import PhotoAlbum from './photoAlbum/PhotoAlbum';
import VisitedPlace from './visitedPlace/VisitedPlace';
import PlanInfo from '../common/planInfo/PlanInfo';

interface Props {
  params: { planId: string };
}

const EndingContent = async ({ params }: Props) => {
  const { planId } = params;

  const plan = await getEndingPlanFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const allPins = await getAllPinsByPlanFromServer(plan);

  return (
    <>
      <PlanInfo plan={plan} allPins={allPins} />
      <PhotoAlbum pictures={plan.pictures} />
      <VisitedPlace allPins={allPins} plan={plan} />
      <FinalCost dates={plan.dates} datesCost={plan.dates_cost} totalCost={plan.total_cost} />
      <Comment planId={planId} />
      <GoToList />
    </>
  );
};

export default EndingContent;
