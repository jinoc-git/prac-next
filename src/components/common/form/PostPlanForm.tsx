'use client';

import React from 'react';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import { addPlan, updatePlan } from '@/api/plan';
import AreaAndPlace from '@/components/plan/areaAndPlace/AreaAndPlace';
import DatePagination from '@/components/plan/datePagination/DatePagination';
import Pay from '@/components/plan/pay/Pay';
import SelectDate from '@/components/plan/selectDate/SelectDate';
import usePagination from '@/hooks/usePagination';
import usePinMutation from '@/hooks/usePinMutation';
import { useAuthStoreState } from '@/store/authStore';
import { useDateStoreActions, useDateStoreState } from '@/store/dateStore';
import { useInviteUserStoreActions, useInviteUserStoreState } from '@/store/inviteUserStore';

import Invite from '../../plan/invite/Invite';

import type { PlanContentsInputType } from '@/components/plan/addOrEditPlan/AddOrEditPlan';
import type { InsertPlanType, PinContentsType, PinType, PlanType } from '@/types/supabase';

interface Props {
  plan?: PlanType;
  originPins?: PinType[];
  readonly: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: UseFormHandleSubmit<PlanContentsInputType, undefined>;
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<PlanContentsInputType>;
  errors: FieldErrors<PlanContentsInputType>;
}

export default function PostPlanForm(props: Props) {
  const { plan, originPins, formRef, readonly, handleSubmit, onChangeCost, register, errors } =
    props;

  const user = useAuthStoreState();
  const { invitedUser } = useInviteUserStoreState();
  const { inviteUser, syncInvitedUser } = useInviteUserStoreActions();
  const { dates } = useDateStoreState();
  const { resetDates } = useDateStoreActions();
  const { pinMutate } = usePinMutation();

  const { currentPage, next, prev, setCurrentPage } = usePagination();

  const [pins, setPins] = React.useState<PinContentsType[][]>([]);
  const router = useRouter();

  const onSubmitAddOrModifyPlan: SubmitHandler<PlanContentsInputType> = async ({
    title,
    totalCost,
  }) => {
    if (user === null) return;
    if (dates.length === 0) {
      toast.error('여행 날짜는 필수입니다.');
      return;
    }

    const isAddPlan = plan === undefined || originPins === undefined;

    if (isAddPlan) {
      const newPlan: InsertPlanType = {
        id: uuid(),
        users_id: user.id,
        dates,
        title,
        total_cost: totalCost,
        isDeleted: false,
        plan_state: 'planning',
      };

      const addPlanData = {
        plan: newPlan,
        pins,
        invitedUser,
      };

      await addPlan(addPlanData);

      router.push('main');
    } else {
      const updatedPlan: InsertPlanType = {
        id: plan.id,
        users_id: plan.users_id,
        dates,
        title,
        total_cost: totalCost,
        isDeleted: plan.isDeleted,
        plan_state: plan.plan_state,
      };

      const updatePlanObj = {
        plan: updatedPlan,
        originPins,
        pins,
        invitedUser,
      };

      await updatePlan(updatePlanObj);

      pinMutate([plan.id, plan.dates]);
    }
  };

  React.useEffect(() => {
    return () => {
      resetDates();
    };
  }, []);

  React.useEffect(() => {
    if (user) {
      inviteUser(user);
      syncInvitedUser();
    }
  }, [user]);

  React.useEffect(() => {
    setCurrentPage(() => 0);
    const initPins: PinContentsType[][] = [];

    if (originPins) {
      dates.forEach((_, i) => {
        if (originPins[i]) initPins.push(originPins[i].contents);
        else initPins.push([]);
      });
    } else {
      dates.forEach(() => {
        initPins.push([]);
      });
    }

    setPins(initPins);
  }, [dates, originPins]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmitAddOrModifyPlan)}
      className="flex flex-col content-layout
        sm:pt-[140px]
        md:pt-[100px] md:px-[10px]"
    >
      <input
        id="title"
        type="text"
        placeholder="여행 제목을 입력하세요."
        readOnly={readonly}
        {...register('title')}
        className="border-b-[1px] border-gray w-full outline-none font-bold placeholder:text-gray text-black read-only:border-none
            sm:text-[20px]
            md:text-[24px] "
      />
      <p
        className="text-xs font-bold text-red-600
            sm:h-[8px] sm:w-[297px]
            md:h-[15px]"
      >
        {errors?.title?.message}
      </p>
      <SelectDate state={plan ? 'modify' : 'addPlan'} planDatesData={plan ? plan.dates : []} />
      <Invite />
      <Pay onChangeCost={onChangeCost} register={register} />
      <DatePagination dates={dates} next={next} prev={prev} currentPage={currentPage} />
      <AreaAndPlace pins={pins} setPins={setPins} currentPage={currentPage} />
    </form>
  );
}
