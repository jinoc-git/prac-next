'use client';

import React, { useEffect, useState } from 'react';
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
import { authStore } from '@/store/authStore';
import { dateStore } from '@/store/dateStore';
import { inviteUserStore } from '@/store/inviteUserStore';

import Invite from '../../plan/invite/Invite';

import type { PlanContentsInputType } from '@/components/plan/planContents/PlanContents';
import type {
  InsertPlanType,
  PinContentsType,
  PinType,
  PlanType,
} from '@/types/supabase';

interface Props {
  plan?: PlanType | null;
  originPins?: PinType[] | null;
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: UseFormHandleSubmit<PlanContentsInputType, undefined>;
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<PlanContentsInputType>;
  errors: FieldErrors<PlanContentsInputType>;
}

export default function PostPlanForm(props: Props) {
  const {
    plan,
    originPins,
    formRef,
    handleSubmit,
    onChangeCost,
    register,
    errors,
  } = props;

  const user = authStore(({ user }) => user);
  const { invitedUser, inviteUser, syncInvitedUser } = inviteUserStore();
  const { dates, oldDates, resetDates } = dateStore();

  const { currentPage, next, prev, setCurrentPage } = usePagination();

  const [pins, setPins] = useState<PinContentsType[][]>([]);
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

    const isAddPlan = plan === null || plan === undefined;

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
        originPins: originPins,
        pins,
        invitedUser,
      };

      await updatePlan(updatePlanObj);
    }
  };

  useEffect(() => {
    return () => {
      resetDates();
    };
  }, []);

  useEffect(() => {
    if (user) {
      inviteUser(user);
      syncInvitedUser();
    }
  }, [user]);

  useEffect(() => {
    setCurrentPage(() => 0);
    const initPins: PinContentsType[][] = [];

    if (originPins) {
      originPins.forEach(({ contents }) => {
        if (contents) initPins.push(contents);
      });
    } else {
      dates.forEach((date) => {
        if (!oldDates.includes(date)) initPins.push([]);
        else initPins.push(pins[oldDates.indexOf(date)]);
      });
    }

    setPins(initPins);
  }, [dates]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmitAddOrModifyPlan)}
      className="flex flex-col mx-auto
        sm:mt-[32px] sm:w-[310px]
        md:mt-[100px] md:w-[720px] md:px-[10px]"
    >
      <input
        id="title"
        type="text"
        placeholder="여행 제목을 입력하세요."
        {...register('title')}
        className="border-b-[1px] border-gray w-full outline-none font-bold placeholder:text-gray  text-black
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
      <SelectDate
        state={plan ? 'modify' : 'addPlan'}
        planDatesData={plan ? plan.dates : []}
      />
      <Invite />
      <Pay onChangeCost={onChangeCost} register={register} errors={errors} />
      <DatePagination
        dates={dates}
        next={next}
        prev={prev}
        currentPage={currentPage}
      />
      <AreaAndPlace pins={pins} setPins={setPins} currentPage={currentPage} />
    </form>
  );
}
