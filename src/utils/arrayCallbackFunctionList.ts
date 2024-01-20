import type { PlanType } from '@/types/supabase';

export const sideBar = {
  sorting: (a: PlanType, b: PlanType) =>
    new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  filtering: (status: string) => (plan: PlanType) => {
    if (status === 'planning') {
      return plan.plan_state === status;
    }
    if (status === 'traveling') {
      return plan.plan_state === status;
    }
    if (status === 'end') {
      return plan.plan_state === status || plan.plan_state === 'recording';
    }
  },
};
